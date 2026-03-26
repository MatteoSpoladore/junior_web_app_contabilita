// src/utils/authUtils.ts
import { jwtDecode } from "jwt-decode";

// Definizione contrattuale della struttura
interface JwtPayloadData {
  exp?: number;
  iat?: number;
  username?: string;
  user?: string;
}

export function getUsernameFromToken(): string {
  const token = localStorage.getItem("access");
  if (!token) return "utente";

  try {
    const decoded = jwtDecode<JwtPayloadData>(token);
    return decoded.username || decoded.user || "utente";
  } catch (e) {
    console.error("Errore decodifica JWT", e);
    return "utente";
  }
}
// // estrazione dell'username per utilizzo all'interno dell'app e dei component
// import { jwtDecode } from "jwt-decode";

// export function getUsernameFromToken(): string {
//   const token = localStorage.getItem("access");
//   if (!token) return "utente";

//   try {
//     const decoded: any = jwtDecode(token);
//     return decoded.username || decoded.user || "utente";
//   } catch (e) {
//     console.error("Errore decodifica JWT", e);
//     return "utente";
//   }
// }
