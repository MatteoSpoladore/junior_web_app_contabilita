// src/ProtectedRoute.tsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { refreshToken, isTokenExpired } from "./pages/auth/auth";

interface ProtectedProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");

        // Caso 1: nessun token
        if (!access && !refresh) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        // Caso 2: solo refresh o access scaduto
        if (isTokenExpired(access)) {
          console.log("Access token scaduto o mancante, provo refresh...");

          // Verifica se anche il refresh è scaduto
          if (isTokenExpired(refresh)) {
            console.log("Anche il refresh token è scaduto → logout");
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            setIsAuthorized(false);
            setLoading(false);
            return;
          }

          // Prova a rinnovare
          const data = await refreshToken();
          if (data) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        } else {
          // Access token valido
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error("Errore verifica auth:", err);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Verifica autenticazione...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { refreshToken } from "./pages/auth/auth";

// interface ProtectedProps {
//   children: JSX.Element;
// }

// export default function ProtectedRoute({ children }: ProtectedProps) {
//   const [loading, setLoading] = useState(true); // loading mentre controlla token
//   const [isAuthorized, setIsAuthorized] = useState(false); // stato dell'autenticazione

//   useEffect(() => {
//     const checkTokens = async () => {
//       try {
//         const access = localStorage.getItem("access");
//         const refresh = localStorage.getItem("refresh");

//         if (!access && !refresh) {
//           // Nessun token → non autorizzato
//           setIsAuthorized(false);
//           return;
//         }

//         if (!access && refresh) {
//           // Solo refresh token → prova a rinnovare l'access token
//           const res = await refreshToken();
//           if (res) {
//             setIsAuthorized(true); // refresh riuscito
//           } else {
//             // refresh fallito: rimuovi token e segna non autorizzato
//             localStorage.removeItem("access");
//             localStorage.removeItem("refresh");
//             setIsAuthorized(false);
//           }
//         } else if (access) {
//           // Access token presente → autorizzato (ottimistica)
//           setIsAuthorized(true);
//         }
//       } catch (err) {
//         // Qualsiasi errore durante il refresh → pulisci token e logout
//         console.error("Errore durante il controllo token:", err);
//         localStorage.removeItem("access");
//         localStorage.removeItem("refresh");
//         setIsAuthorized(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkTokens();
//   }, []);

//   if (loading) {
//     return <div>PR Caricamento...</div>; // mostra qualcosa mentre controlla
//   }

  // if (!isAuthorized) {
  //   return <Navigate to="/login" replace />;
  // }

//   return children;
// }
