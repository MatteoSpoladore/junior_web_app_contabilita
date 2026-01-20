import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("light");

  // opzionale: salva il tema
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      {/* wrapper globale */}
      <div className="app-root">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Homepage />} />

          {/* TEORIA */}
          <Route path="/teoria" element={<TheoryLayout />}>
            <Route index element={<Indice />} />
            <Route path="indice" element={<Indice />} />
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
          </Route>

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* AREA PRIVATA */}
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
