import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Fade,
  CircularProgress,
} from "@mui/material";

import ScritturaForm from "@/components/scritture/ScritturaForm";
import ScrittureTable from "@/components/esercizi/ScrittureTable";
import MastriniTable from "@/components/mastrini/MastriniTable";
import ScritturaEditDialog from "@/components/scritture/ScritturaEditDialog";
import ExportScritturePDF from "@/components/export/ExportScritturePdf";
import ExportMastriniPDF from "@/components/export/ExportMastriniPdf";
import ThemeToggle from "@/components/teoria/layout/ThemeToggle";

// Importa l'hook personalizzato
import { useContabilita } from "@/hooks/useContabilita";
import type { Esercizio } from "@/types";

// 1. Dichiariamo che l'esercizio può essere null all'avvio
interface DashboardProps {
  esercizio: Esercizio | null;
}

export default function Dashboard({ esercizio }: DashboardProps) {
  const [showBilancio, setShowBilancio] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  // Invocazione dell'hook: estraiamo solo i dati e le funzioni necessarie
  const { scritture, mastrini, isLoading, error, refresh } = useContabilita(
    esercizio?.id,
  );

  // 2. Blocco di protezione corretto (con chiusura del frammento </>)
  if (!esercizio) {
    return (
      <>
        <Box sx={{ position: "fixed", top: 10, right: 150, zIndex: 1300 }}>
          <ThemeToggle />
        </Box>
        <Box textAlign="center" mt={10}>
          <Typography variant="h5">Crea o seleziona un esercizio</Typography>
        </Box>
      </>
    );
  }

  // 3. Inizio del return principale della Dashboard
  return (
    <Box flex={1} p={3} mt={6}>
      {/* Gestione Errori di Rete */}
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {/* ==================== HEADER ==================== */}
      <Box display="flex" flexDirection="column" gap={2}>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button
            variant={showBilancio ? "contained" : "outlined"}
            onClick={() => setShowBilancio((p) => !p)}
          >
            {showBilancio ? "Scritture" : "Mastrini"}
          </Button>

          <ExportScritturePDF scritture={scritture} esercizio={esercizio} />
          <ExportMastriniPDF mastrini={mastrini} esercizio={esercizio} />
          <Button variant="outlined">Bottone 4</Button>
          <Button variant="outlined">Bottone 5</Button>
        </Stack>
      </Box>

      {/* ==================== FORM ==================== */}
      <Box mt={3}>
        <ScritturaForm
          mastrini={mastrini}
          onSaved={refresh}
          esercizioId={esercizio.id}
        />
      </Box>

      {/* ==================== TABELLE / LOADING ==================== */}
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

      {/* ==================== DIALOG EDIT ==================== */}
      <ScritturaEditDialog
        data={editData}
        setData={setEditData}
        mastrini={mastrini}
        refresh={refresh}
      />
    </Box>
  );
}
