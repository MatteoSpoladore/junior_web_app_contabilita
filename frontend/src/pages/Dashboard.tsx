import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Fade,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ScritturaForm from "@/components/scritture/ScritturaForm";
import ScrittureTable from "@/components/esercizi/ScrittureTable";
import MastriniTable from "@/components/mastrini/MastriniTable";
import ScritturaEditDialog from "@/components/scritture/ScritturaEditDialog";
import ExportScritturePDF from "@/components/export/ExportScritturePdf";
import ExportMastriniPDF from "@/components/export/ExportMastriniPdf";
import ThemeToggle from "@/components/teoria/layout/ThemeToggle";

import { useContabilita } from "@/hooks/useContabilita";
import type { Esercizio } from "@/types";
import api from "@/api";

// La prop è opzionale perché ora la Dashboard sa leggere l'URL da sola
interface DashboardProps {
  esercizio?: Esercizio | null;
}

export default function Dashboard({
  esercizio: propEsercizio,
}: DashboardProps) {
  const { id } = useParams(); // <-- LEGGE L'ID DALL'URL (es: /app/esercizio/15)
  const navigate = useNavigate();

  const [showBilancio, setShowBilancio] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  // Stato locale per l'esercizio scaricato tramite URL
  const [esercizio, setEsercizio] = useState<Esercizio | null>(
    propEsercizio || null,
  );
  const [loadingEsercizio, setLoadingEsercizio] = useState(false);

  // 1. Logica di Fetching dell'Esercizio
  useEffect(() => {
    if (id) {
      setLoadingEsercizio(true);
      api
        .get(`/esercizi/${id}/`)
        .then((res) => setEsercizio(res.data))
        .catch((err) =>
          console.error("Errore nel caricamento dell'esercizio:", err),
        )
        .finally(() => setLoadingEsercizio(false));
    } else if (propEsercizio === null) {
      setEsercizio(null); // Reset se siamo sulla home
    }
  }, [id, propEsercizio]);

  // 2. Passiamo l'ID all'hook dei Mastrini/Scritture
  const { scritture, mastrini, isLoading, error, refresh } = useContabilita(
    esercizio?.id,
  );

  // --- SCHERMATA VUOTA (Nessun esercizio selezionato) ---
  if (!esercizio && !loadingEsercizio) {
    return (
      <>
        <Box sx={{ position: "fixed", top: 10, right: 150, zIndex: 1300 }}>
          <ThemeToggle />
        </Box>
        <Box textAlign="center" mt={10}>
          <Typography variant="h5">
            Crea o seleziona un esercizio dalla Sidebar
          </Typography>
        </Box>
      </>
    );
  }

  // --- SCHERMATA DI CARICAMENTO ---
  if (loadingEsercizio) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  // --- DASHBOARD CONTABILE ---
  return (
    <Box flex={1} p={3} pt={2}>
      {/* IL BOTTONE "CHIUDI ESERCIZIO" MAGICO */}
      {/* navigate(-1) significa letteralmente "vai indietro di una pagina nella cronologia" */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Chiudi Esercizio
      </Button>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {/* ==================== HEADER ESERCIZIO ==================== */}
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4" mb={1}>
          {esercizio?.nome}
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button
            variant={showBilancio ? "contained" : "outlined"}
            onClick={() => setShowBilancio((p) => !p)}
          >
            {showBilancio ? "Scritture" : "Mastrini"}
          </Button>
          {esercizio && (
            <ExportScritturePDF scritture={scritture} esercizio={esercizio} />
          )}
          {esercizio && (
            <ExportMastriniPDF mastrini={mastrini} esercizio={esercizio} />
          )}
        </Stack>
      </Box>

      {/* ==================== FORM ==================== */}
      <Box mt={3}>
        <ScritturaForm
          mastrini={mastrini}
          onSaved={refresh}
          esercizioId={esercizio!.id}
        />
      </Box>

      {/* ==================== TABELLE ==================== */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={3} position="relative">
          <Fade in={!showBilancio} timeout={250} unmountOnExit>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <ScrittureTable
                rows={scritture}
                onEdit={setEditData}
                onDeleteComplete={refresh}
              />
            </Box>
          </Fade>
          <Fade in={showBilancio} timeout={250} unmountOnExit>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <MastriniTable mastrini={mastrini} />
            </Box>
          </Fade>
        </Box>
      )}

      {/* ==================== DIALOG ==================== */}
      <ScritturaEditDialog
        data={editData}
        setData={setEditData}
        mastrini={mastrini}
        refresh={refresh}
      />
    </Box>
  );
}
