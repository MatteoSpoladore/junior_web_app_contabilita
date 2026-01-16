import { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Fade } from "@mui/material";
import api from "../api";
import ScritturaForm from "../components/scritture/ScritturaForm";
import ScrittureTable from "../components/esercizi/ScrittureTable";
import MastriniTable from "../components/mastrini/MastriniTable";
import ScritturaEditDialog from "../components/scritture/ScritturaEditDialog";
import ExportScritturePDF from "../components/export/ExportScritturePdf";
import ExportMastriniPDF from "../components/export/ExportMastriniPdf";
import GridBackground from "../components/layout/GridBackGround";

export default function Dashboard({ esercizio }: any) {
  const [scritture, setScritture] = useState([]);
  const [mastrini, setMastrini] = useState([]);
  const [showBilancio, setShowBilancio] = useState(false);
  const [editData, setEditData] = useState(null);

  const refresh = async () => {
    const s = await api.get(`/scritture/?esercizio=${esercizio.id}`);
    const m = await api.get(`/mastrini/?esercizio=${esercizio.id}`);
    setScritture(s.data);
    setMastrini(m.data);
  };

  useEffect(() => {
    if (esercizio) refresh();
  }, [esercizio]);

  if (!esercizio)
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5">Crea o seleziona un esercizio</Typography>
      </Box>
    );

  return (
    <Box flex={1} p={3} mt={6}>
      {/* ==================== HEADER ==================== */}
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Titolo */}
        {/* <Typography variant="h4" textAlign="center">
          {esercizio.nome}
        </Typography> */}

        {/* Toolbar bottoni */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button
            variant={showBilancio ? "contained" : "outlined"}
            onClick={() => setShowBilancio((p) => !p)}
          >
            {showBilancio ? "Scritture" : "Mastrini"}
          </Button>

          {/* Bottoni placeholder */}
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

      {/* ==================== TABELLE ==================== */}
      {/* cancellare il box e togliere entrambi gli overflowX per riavere la scrollbar globale*/}
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
