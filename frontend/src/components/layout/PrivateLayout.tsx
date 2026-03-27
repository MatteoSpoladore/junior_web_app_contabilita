import { useState, useEffect } from "react";
import { Box, CssBaseline, Fade, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { jwtDecode } from "jwt-decode";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "@/pages/Dashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import StudentDetail from "@/pages/StudentDetail";
import api from "@/api";

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
  const [isProfessore, setIsProfessore] = useState(false);
  const [studenteSelezionato, setStudenteSelezionato] = useState<any>(null);

  // Fetch esercizi - la gestione token è in api.ts
  const fetchEsercizi = async () => {
    setLoading(true);
    try {
      const res = await api.get("/esercizi/");
      setEsercizi(res.data);
    } catch (err: any) {
      console.error("Errore fetching esercizi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Controllo del ruolo prima di caricare il resto
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.is_professore) {
          setIsProfessore(true);
        }
      } catch (error) {
        console.error("Errore nella decodifica del token", error);
      }
    }

    fetchEsercizi();
  }, []);

  // Effetto magico: Se clicchi un esercizio dalla sidebar mentre guardi un alunno, chiudi la visualizzazione alunno
  useEffect(() => {
    if (esercizioSelezionato && studenteSelezionato) {
      setStudenteSelezionato(null);
    }
  }, [esercizioSelezionato]);

  if (loading) {
    return <Box p={3}>Caricamento...</Box>;
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* La sidebar mostra gli esercizi di proprietà dell'utente loggato (Prof o Studente) */}
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
          pt: 2,
        }}
      >
        <Fade
          key={
            esercizioSelezionato?.id ||
            studenteSelezionato?.id ||
            (isProfessore ? "prof" : "home")
          }
          in
          timeout={300}
        >
          <Box>
            {/* LOGICA DI NAVIGAZIONE INTELLIGENTE */}

            {esercizioSelezionato ? (
              // 1. STATO: Guardiamo un esercizio (nostro o di un alunno)
              <Box p={3} pt={8}>
                {isProfessore && (
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => {
                      setEsercizioSelezionato(null);
                    }}
                    sx={{ mb: 2 }}
                  >
                    Chiudi Esercizio
                  </Button>
                )}
                <Dashboard esercizio={esercizioSelezionato} />
              </Box>
            ) : studenteSelezionato ? (
              // 2. STATO: Guardiamo il dettaglio di un alunno (solo Prof)
              <StudentDetail
                studente={studenteSelezionato}
                onBack={() => setStudenteSelezionato(null)}
                onSelectEsercizio={setEsercizioSelezionato}
              />
            ) : isProfessore ? (
              // 3. STATO: Home del Professore (Lista alunni)
              <TeacherDashboard onSelectStudent={setStudenteSelezionato} />
            ) : (
              // 4. STATO: Home dello Studente (Schermata vuota / "Seleziona esercizio")
              <Dashboard esercizio={null} />
            )}
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}
