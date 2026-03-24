// src/api.ts
import axios from "axios";
import { logout, refreshToken, getToken } from "./pages/auth/auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// 1. Aggiungiamo il token attuale ad ogni richiesta
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Variabili per gestire il traffico durante il refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 2. Intercettiamo gli errori di risposta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se l'errore è 401 (Non autorizzato) e non abbiamo già ritentato
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Se c'è già un refresh in corso, mettiamo questa richiesta in coda
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Se non c'è un refresh in corso, lo avviamo
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshToken();
        if (data && data.access) {
          // Processiamo la coda delle chiamate in attesa
          processQueue(null, data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } else {
          throw new Error("Token non ricevuto");
        }
      } catch (err) {
        processQueue(err, null);
        logout();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

// import axios from "axios";
// import {
//   logout,
//   refreshToken,
//   getToken,
//   isTokenExpired,
// } from "./pages/auth/auth";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// // Aggiungi token a tutte le richieste
// api.interceptors.request.use(
//   async (config) => {
//     let token = getToken();

//     // Se l'access token è scaduto, prova a rinnovarlo PRIMA della richiesta
//     if (token && isTokenExpired(token)) {
//       console.log("Access token scaduto, provo refresh...");
//       const data = await refreshToken();
//       if (data) {
//         token = data.access;
//       } else {
//         // Refresh fallito → logout
//         logout();
//         window.location.href = "/login";
//         return Promise.reject(
//           new Error("Token scaduto, effettua nuovamente il login")
//         );
//       }
//     }

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Interceptor di risposta (backup per 401)
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Se riceviamo 401 e non abbiamo già ritentato
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const data = await refreshToken();
//         if (data) {
//           originalRequest.headers.Authorization = `Bearer ${data.access}`;
//           return api(originalRequest);
//         } else {
//           // Refresh fallito → logout e redirect
//           logout();
//           window.location.href = "/login";
//           return Promise.reject(error);
//         }
//       } catch (err) {
//         logout();
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// // import axios from "axios";
// // import { logout, refreshToken, getToken } from "./pages/auth/auth";

// // const api = axios.create({
// //   baseURL: "http://127.0.0.1:8000/api/",
// // });

// // // Aggiungi token a tutte le richieste
// // api.interceptors.request.use((config) => {
// //   const token = getToken();
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // // Interceptor di risposta per gestire refresh token
// // let isRefreshing = false;
// // let failedQueue: any[] = [];

// // const processQueue = (error: any, token: string | null = null) => {
// //   failedQueue.forEach((prom) => {
// //     if (error) {
// //       prom.reject(error);
// //     } else {
// //       prom.resolve(token);
// //     }
// //   });
// //   failedQueue = [];
// // };

// // api.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;

// //     // Se è 401 e non stiamo già refreshando
// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       if (isRefreshing) {
// //         // Mettiamo in coda la richiesta mentre il refresh è in corso
// //         return new Promise((resolve, reject) => {
// //           failedQueue.push({ resolve, reject });
// //         })
// //           .then((token) => {
// //             originalRequest.headers.Authorization = "Bearer " + token;
// //             return api(originalRequest);
// //           })
// //           .catch((err) => Promise.reject(err));
// //       }

// //       originalRequest._retry = true;
// //       isRefreshing = true;

// //       try {
// //         const data = await refreshToken();
// //         isRefreshing = false;
// //         processQueue(null, data.access);
// //         originalRequest.headers.Authorization = "Bearer " + data.access;
// //         return api(originalRequest);
// //       } catch (err) {
// //         isRefreshing = false;
// //         processQueue(err, null);
// //         logout(); // Logout definitivo se anche il refresh fallisce
// //         window.location.href = "/login"; // reindirizza alla login
// //         return Promise.reject(err);
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default api;
