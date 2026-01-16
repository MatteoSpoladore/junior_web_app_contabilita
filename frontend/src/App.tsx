import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateLayout from "./components/layout/PrivateLayout";
import Homepage from "./pages/Hompage";

import TheoryLayout from "./components/teoria/layout/TheoryLayout";
import GeneralAccountingTheory from "./components/teoria/pages/Generale";
import "./App.css";
import RateiERisconti from "./components/teoria/pages/RateiRisconti";
import LeasingFinanziarioTheory from "./components/teoria/pages/LeasingFinanziario";
import ImmobilizzazioniTheory from "./components/teoria/pages/Immobilizzazioni";
import Indice from "./components/teoria/pages/Indice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOMEPAGE */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Homepage />} />

        {/* TEORIA (PUBBLICA) */}
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
          {/* future:
          <Route path="analytic-accounting" element={<AnalyticAccountingTheory />} />
          */}
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
    </BrowserRouter>
  );
}
