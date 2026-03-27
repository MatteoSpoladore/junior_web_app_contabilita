import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Layout e Pagine
import PrivateLayout from "./components/layout/PrivateLayout";
import Homepage from "./pages/Hompage";

// Teoria
import TheoryLayout from "./components/teoria/layout/TheoryLayout";
import { theoryRoutes } from "./components/teoria/route/TheoryRoutes";

// Il ThemeProvider viene importato qui per diventare Globale
import { ThemeProvider } from "./components/teoria/layout/ThemeContext";

import "./App.css";

export default function App() {
  return (
    // 1. Spostiamo il ThemeProvider alla radice.
    // Ora TUTTA l'app ha accesso al tema e mantiene lo stato durante la navigazione.
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-root">
          <Routes>
            {/* Redirect root */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Homepage (Rimossa l'istanza singola del ThemeProvider) */}
            <Route path="/home" element={<Homepage />} />

            {/* Teoria (Rimossa l'istanza singola del ThemeProvider) */}
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

            {/* Auth (Ora ereditano automaticamente il tema) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:uid/:token"
              element={<ResetPassword />}
            />

            {/* Area privata */}
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
    </ThemeProvider>
  );
}
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import PrivateLayout from "./components/layout/PrivateLayout";
// import Homepage from "./pages/Hompage";
// import ForgotPassword from "./pages/auth/ForgorPassword";

// import TheoryLayout from "./components/teoria/layout/TheoryLayout";
// import { ThemeProvider } from "./components/teoria/layout/ThemeContext";
// import { theoryRoutes } from "./components/teoria/route/TheoryRoutes";

// import "./App.css";
// import ResetPassword from "./pages/auth/ResetPassword";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="app-root">
//         <Routes>
//           {/* Redirect root */}
//           <Route path="/" element={<Navigate to="/home" replace />} />

//           {/* Homepage */}
//           <Route
//             path="/home"
//             element={
//               <ThemeProvider>
//                 <Homepage />
//               </ThemeProvider>
//             }
//           />

//           {/* Teoria */}
//           <Route
//             path="/teoria/*"
//             element={
//               <ThemeProvider>
//                 <TheoryLayout />
//               </ThemeProvider>
//             }
//           >
//             {/* Generazione automatica delle route */}
//             {theoryRoutes.map((route) => (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 element={<route.component />} // <-- JSX corretto
//               />
//             ))}

//             {/* fallback: redirect a indice se non match */}
//             <Route path="*" element={<Navigate to="indice" replace />} />
//           </Route>

//           {/* Auth */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route
//             path="/reset-password/:uid/:token"
//             element={<ResetPassword />}
//           />
//           {/* Area privata */}
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
