// src/pages/auth/auth.ts
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://127.0.0.1:8000/api/auth"; // ← Aggiunto /auth

interface DecodedToken {
  exp: number;
  username?: string;
  user_id?: number;
}

// Controlla se il token è scaduto
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000; // timestamp in secondi
    return decoded.exp < now;
  } catch (e) {
    console.error("Errore decodifica token:", e);
    return true;
  }
}

// Ottieni access token
export function getToken(): string | null {
  return localStorage.getItem("access");
}

// Login
export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<boolean> {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      username,
      password,
    });

    const { access, refresh } = response.data;
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    return true;
  } catch (error: any) {
    console.error("Errore login:", error.response?.data || error);
    return false;
  }
}

// Register
export async function register(data: {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}): Promise<boolean> {
  try {
    await axios.post(`${BASE_URL}/register/`, {
      username: data.username,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
    });

    return true;
  } catch (error: any) {
    console.error("Errore registrazione:", error.response?.data || error);
    throw error;
  }
}

// Refresh token
export async function refreshToken(): Promise<{ access: string } | null> {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    console.log("Nessun refresh token disponibile");
    return null;
  }

  // Verifica se il refresh token è scaduto
  if (isTokenExpired(refresh)) {
    console.log("Refresh token scaduto");
    logout();
    return null;
  }

  try {
    const response = await axios.post(`${BASE_URL}/token/refresh/`, {
      refresh: refresh,
    });

    const newAccess = response.data.access;
    localStorage.setItem("access", newAccess);

    return { access: newAccess };
  } catch (error: any) {
    console.error("Errore refresh token:", error.response?.data || error);
    logout();
    return null;
  }
}

// Logout
export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

// Verifica se l'utente è autenticato
export function isAuthenticated(): boolean {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  // Se abbiamo un access token valido
  if (access && !isTokenExpired(access)) {
    return true;
  }

  // Se abbiamo un refresh token valido (possiamo rinnovare)
  if (refresh && !isTokenExpired(refresh)) {
    return true;
  }

  return false;
}

// // src/pages/auth/auth.ts
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const BASE_URL = "http://127.0.0.1:8000/api";

// interface DecodedToken {
//   exp: number;
//   username?: string;
//   user_id?: number;
// }

// // Controlla se il token è scaduto
// export function isTokenExpired(token: string | null): boolean {
//   if (!token) return true;

//   try {
//     const decoded: DecodedToken = jwtDecode(token);
//     const now = Date.now() / 1000; // timestamp in secondi
//     return decoded.exp < now;
//   } catch (e) {
//     console.error("Errore decodifica token:", e);
//     return true;
//   }
// }

// // Ottieni access token
// export function getToken(): string | null {
//   return localStorage.getItem("access");
// }

// // Login
// export async function login(
//   username: string,
//   password: string
// ): Promise<boolean> {
//   try {
//     const response = await axios.post(`${BASE_URL}/token/`, {
//       username,
//       password,
//     });

//     const { access, refresh } = response.data;

//     // Salva i token
//     localStorage.setItem("access", access);
//     localStorage.setItem("refresh", refresh);

//     return true;
//   } catch (error: any) {
//     console.error("Errore login:", error.response?.data || error);
//     return false;
//   }
// }

// // Register (opzionale, se ti serve)
// // Register - versione pulita
// export async function register(data: {
//   username: string;
//   email: string;
//   password: string;
//   confirm_password: string;
// }): Promise<boolean> {
//   try {
//     await axios.post(`${BASE_URL}/register/`, {
//       username: data.username,
//       email: data.email,
//       password: data.password,
//       confirm_password: data.confirm_password,
//     });

//     return true;
//   } catch (error: any) {
//     console.error("Errore registrazione:", error.response?.data || error);
//     throw error; // Rilancia l'errore per gestirlo nel componente
//   }
// }

// // Refresh token
// export async function refreshToken(): Promise<{ access: string } | null> {
//   const refresh = localStorage.getItem("refresh");

//   if (!refresh) {
//     console.log("Nessun refresh token disponibile");
//     return null;
//   }

//   // Verifica se il refresh token è scaduto
//   if (isTokenExpired(refresh)) {
//     console.log("Refresh token scaduto");
//     logout();
//     return null;
//   }

//   try {
//     const response = await axios.post(`${BASE_URL}/token/refresh/`, {
//       refresh: refresh,
//     });

//     const newAccess = response.data.access;
//     localStorage.setItem("access", newAccess);

//     return { access: newAccess };
//   } catch (error: any) {
//     console.error("Errore refresh token:", error.response?.data || error);
//     logout();
//     return null;
//   }
// }

// // Logout
// export function logout() {
//   localStorage.removeItem("access");
//   localStorage.removeItem("refresh");
// }

// // Verifica se l'utente è autenticato
// export function isAuthenticated(): boolean {
//   const access = localStorage.getItem("access");
//   const refresh = localStorage.getItem("refresh");

//   // Se abbiamo un access token valido
//   if (access && !isTokenExpired(access)) {
//     return true;
//   }

//   // Se abbiamo un refresh token valido (possiamo rinnovare)
//   if (refresh && !isTokenExpired(refresh)) {
//     return true;
//   }

//   return false;
// }
// // src/pages/auth/auth.ts
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const BASE_URL = "http://127.0.0.1:8000/api";

// interface DecodedToken {
//   exp: number;
//   username?: string;
//   user_id?: number;
// }

// // Controlla se il token è scaduto
// export function isTokenExpired(token: string | null): boolean {
//   if (!token) return true;

//   try {
//     const decoded: DecodedToken = jwtDecode(token);
//     const now = Date.now() / 1000; // timestamp in secondi
//     return decoded.exp < now;
//   } catch (e) {
//     console.error("Errore decodifica token:", e);
//     return true;
//   }
// }

// // Ottieni access token
// export function getToken(): string | null {
//   return localStorage.getItem("access");
// }

// // Refresh token
// export async function refreshToken(): Promise<{ access: string } | null> {
//   const refresh = localStorage.getItem("refresh");

//   if (!refresh) {
//     console.log("Nessun refresh token disponibile");
//     return null;
//   }

//   // Verifica se il refresh token è scaduto
//   if (isTokenExpired(refresh)) {
//     console.log("Refresh token scaduto");
//     logout();
//     return null;
//   }

//   try {
//     const response = await axios.post(`${BASE_URL}/token/refresh/`, {
//       refresh: refresh,
//     });

//     const newAccess = response.data.access;
//     localStorage.setItem("access", newAccess);

//     return { access: newAccess };
//   } catch (error: any) {
//     console.error("Errore refresh token:", error.response?.data || error);
//     logout();
//     return null;
//   }
// }

// // Logout
// export function logout() {
//   localStorage.removeItem("access");
//   localStorage.removeItem("refresh");
// }

// // import api from "../../api";

// // export interface LoginData {
// //   username: string;
// //   password: string;
// // }

// // export interface RegisterData {
// //   username: string;
// //   email: string;
// //   password: string;
// //   confirm_password: string;
// // }

// // // LOGIN
// // export async function login(data: LoginData) {
// //   const res = await api.post("auth/login/", data);
// //   localStorage.setItem("access", res.data.access);
// //   localStorage.setItem("refresh", res.data.refresh);
// //   return res.data;
// // }

// // // REGISTER
// // export async function registerUser(data: RegisterData) {
// //   return api.post("auth/register/", data);
// // }

// // // REFRESH TOKEN (opzionale per auto rinnovo)
// // export async function refreshToken() {
// //   const refresh = localStorage.getItem("refresh");
// //   if (!refresh) return null;

// //   try {
// //     const res = await api.post("auth/token/refresh/", { refresh });
// //     localStorage.setItem("access", res.data.access);
// //     return res.data;
// //   } catch (err) {
// //     logout(); // rimuove token se refresh non valido
// //     return null;
// //   }
// // }

// // // LOGOUT
// // export function logout() {
// //   localStorage.removeItem("access");
// //   localStorage.removeItem("refresh");
// // }

// // // GET TOKEN
// // export function getToken() {
// //   return localStorage.getItem("access");
// // }
