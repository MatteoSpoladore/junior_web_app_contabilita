import { useState } from "react";
import { Box, CssBaseline, Fade } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom"; // <-- IMPORTANTE: Outlet

import Header from "./Header";
import Sidebar from "./Sidebar";

import {
  DRAWER_WIDTH,
  DRAWER_COLLAPSED_WIDTH,
  LAYOUT_TRANSITION,
} from "./layout.constants";

export default function PrivateLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation(); // Ci serve per animare dolcemente i cambi pagina

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CssBaseline />

      {/* 1. LA CORNICE SUPERIORE */}
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* 2. LA CORNICE LATERALE (Ora è indipendente e si scarica i dati da sola!) */}
      <Sidebar open={sidebarOpen} />

      {/* 3. IL CONTENUTO CENTRALE */}
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          ml: sidebarOpen ? `${DRAWER_WIDTH}px` : `${DRAWER_COLLAPSED_WIDTH}px`,
          transition: `margin-left ${LAYOUT_TRANSITION}`,
          overflowX: "hidden",
          pt: 2,
        }}
      >
        {/* L'animazione scatta ogni volta che l'URL cambia */}
        <Fade key={location.pathname} in timeout={300}>
          <Box>
            {/* IL BUCO MAGICO: Qui React Router incolla Dashboard, TeacherDashboard o StudentDetail! */}
            <Outlet />
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}
