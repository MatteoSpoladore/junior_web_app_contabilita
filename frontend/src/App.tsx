import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import ProtectedRoute from "./ProtectedRoute";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Layout e Pagine
import PrivateLayout from "./components/layout/PrivateLayout";
import Homepage from "./pages/Hompage";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDetail from "./pages/StudentDetail";

// Teoria
import TheoryLayout from "./components/teoria/layout/TheoryLayout";
import { theoryRoutes } from "./components/teoria/route/TheoryRoutes";

// Theme
import { ThemeProvider } from "./components/teoria/layout/ThemeContext";

import "./App.css";

// --- IL DEVIATORE INTELLIGENTE ---
// Sceglie cosa mostrare in base al ruolo dell'utente quando visita "/app"
function HomeRouter() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access"); // Assicurati che sia la chiave giusta
  let isProf = false;

  if (token) {
    try {
      isProf = (jwtDecode(token) as any).is_professore;
    } catch (e) {
      console.error("Token non valido", e);
    }
  }

  if (isProf) {
    // Se è prof, gli passiamo una funzione che CAMBIA L'URL invece di usare gli state!
    return (
      <TeacherDashboard
        onSelectStudent={(studente) => navigate(`/app/alunno/${studente.id}`)}
      />
    );
  } else {
    // Se è studente, vede la pagina vuota
    return <Dashboard esercizio={null} />;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-root">
          <Routes>
            {/* Redirect root */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Homepage */}
            <Route path="/home" element={<Homepage />} />

            {/* Teoria */}
            <Route path="/teoria/*" element={<TheoryLayout />}>
              {theoryRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              <Route path="*" element={<Navigate to="indice" replace />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:uid/:token"
              element={<ResetPassword />}
            />

            {/* --- AREA PRIVATA (REACT ROUTER) --- */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <PrivateLayout />
                </ProtectedRoute>
              }
            >
              {/* Le rotte figlie verranno iniettate dentro <Outlet /> nel PrivateLayout */}
              <Route index element={<HomeRouter />} />
              <Route path="alunno/:id" element={<StudentDetail />} />
              <Route
                path="esercizio/:id"
                element={<Dashboard esercizio={null} />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
