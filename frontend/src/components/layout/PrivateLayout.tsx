// src/components/layout/PrivateLayout.tsx
import { useState, useEffect } from "react";
import { Box, CssBaseline, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard";
import api from "../../api";

import {
  DRAWER_WIDTH,
  DRAWER_COLLAPSED_WIDTH,
  LAYOUT_TRANSITION,
} from "./layout.constants";

export default function PrivateLayout() {
  const [esercizi, setEsercizi] = useState([]);
  const [esercizioSelezionato, setEsercizioSelezionato] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch esercizi - la gestione token è in api.ts
  const fetchEsercizi = async () => {
    setLoading(true);
    try {
      const res = await api.get("/esercizi/");
      setEsercizi(res.data);
    } catch (err: any) {
      console.error("Errore fetching esercizi:", err);
      // Se l'errore è di auth, l'interceptor ha già fatto logout+redirect
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEsercizi();
  }, []);

  if (loading) {
    return <Box p={3}>Caricamento dati...</Box>;
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Sidebar
        open={sidebarOpen}
        esercizi={esercizi}
        setEsercizioSelezionato={setEsercizioSelezionato}
        esercizioSelezionato={esercizioSelezionato}
        refreshEsercizi={fetchEsercizi}
      />

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          ml: sidebarOpen ? `${DRAWER_WIDTH}px` : `${DRAWER_COLLAPSED_WIDTH}px`,
          transition: `margin-left ${LAYOUT_TRANSITION}`,
          overflowX: "hidden",
          p: 3,
        }}
      >
        <Fade key={esercizioSelezionato?.id ?? "empty"} in timeout={300}>
          <Box>
            <Dashboard esercizio={esercizioSelezionato} />
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}
