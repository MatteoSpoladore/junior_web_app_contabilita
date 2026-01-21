import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateLayout from "./components/layout/PrivateLayout";
import Homepage from "./pages/Hompage";

import TheoryLayout from "./components/teoria/layout/TheoryLayout";
import GeneralAccountingTheory from "./components/teoria/pages/Generale";
import RateiERisconti from "./components/teoria/pages/RateiRisconti";
import LeasingFinanziarioTheory from "./components/teoria/pages/LeasingFinanziario";
import ImmobilizzazioniTheory from "./components/teoria/pages/Immobilizzazioni";
import Indice from "./components/teoria/pages/Indice";
import AumentoCapitaleSocialeTheory from "./components/teoria/pages/AumentoCapitaleSociale";
import GuidaCodice from "./components/teoria/pages/GuidaCodice";
import GuidaContenuti from "./components/teoria/pages/GuidaContenuti";
import { ThemeProvider } from "./components/teoria/layout/ThemeContext";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Homepage con ThemeProvider */}
          <Route
            path="/home"
            element={
              <ThemeProvider>
                <Homepage />
              </ThemeProvider>
            }
          />

          {/* Teoria e tutte le sue route con ThemeProvider */}
          <Route
            path="/teoria"
            element={
              <ThemeProvider>
                <TheoryLayout />
              </ThemeProvider>
            }
          >
            <Route index element={<Indice />} />
            <Route path="indice" element={<Indice />} />
            <Route path="guida-ai-contenuti" element={<GuidaContenuti />} />
            <Route path="generale" element={<GeneralAccountingTheory />} />
            <Route path="ratei-e-risconti" element={<RateiERisconti />} />
            <Route path="leasing" element={<LeasingFinanziarioTheory />} />
            <Route
              path="immobilizzazioni-avanzate"
              element={<ImmobilizzazioniTheory />}
            />
            <Route
              path="aumento-capitale-sociale"
              element={<AumentoCapitaleSocialeTheory />}
            />
            <Route path="guida-codice" element={<GuidaCodice />} />
          </Route>

          {/* Auth senza ThemeProvider */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Area privata senza ThemeProvider */}
          <Route
            path="/app/*"
            element={
              <ProtectedRoute>
                <PrivateLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import ProtectedRoute from "./ProtectedRoute";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import PrivateLayout from "./components/layout/PrivateLayout";
// import Homepage from "./pages/Hompage";

// import TheoryLayout from "./components/teoria/layout/TheoryLayout";
// import GeneralAccountingTheory from "./components/teoria/pages/Generale";
// import RateiERisconti from "./components/teoria/pages/RateiRisconti";
// import LeasingFinanziarioTheory from "./components/teoria/pages/LeasingFinanziario";
// import ImmobilizzazioniTheory from "./components/teoria/pages/Immobilizzazioni";
// import Indice from "./components/teoria/pages/Indice";
// import AumentoCapitaleSocialeTheory from "./components/teoria/pages/AumentoCapitaleSociale";
// import { ThemeProvider } from "./components/teoria/layout/ThemeContext";

// import "./App.css";

// export default function App() {
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);
//   return (
//     <BrowserRouter>
//       {/* wrapper globale */}
//       <div className="app-root">
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" replace />} />
//           <ThemeProvider>
//             <Route path="/home" element={<Homepage />} />
//           </ThemeProvider>
//           {/* TEORIA */}
//           <ThemeProvider>
//             <Route path="/teoria" element={<TheoryLayout />}>
//               <Route index element={<Indice />} />
//               <Route path="indice" element={<Indice />} />
//               <Route path="generale" element={<GeneralAccountingTheory />} />
//               <Route path="ratei-e-risconti" element={<RateiERisconti />} />
//               <Route path="leasing" element={<LeasingFinanziarioTheory />} />
//               <Route
//                 path="immobilizzazioni-avanzate"
//                 element={<ImmobilizzazioniTheory />}
//               />
//               <Route
//                 path="aumento-capitale-sociale"
//                 element={<AumentoCapitaleSocialeTheory />}
//               />
//             </Route>
//           </ThemeProvider>
//           {/* AUTH */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* AREA PRIVATA */}
//           <Route
//             path="/app/*"
//             element={
//               <ProtectedRoute>
//                 <PrivateLayout />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }
