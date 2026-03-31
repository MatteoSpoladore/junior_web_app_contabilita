import { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Autocomplete,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api";

// Nuovo tipo di stato
type RigaForm = {
  conto: any | null;
  dare: string;
  avere: string;
};

const rigaVuota = (): RigaForm => ({
  conto: null,
  dare: "",
  avere: "",
});

export default function ScritturaEditDialog({
  data,
  setData,
  mastrini,
  refresh,
}: any) {
  const [dataOp, setDataOp] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [righe, setRighe] = useState<RigaForm[]>([]);

  // Popola il form quando viene passata una nuova "data" (l'operazione da modificare)
  useEffect(() => {
    if (!data) return;

    setDataOp(data.data || "");
    setDescrizione(data.descrizione || "");

    if (data.righe && data.righe.length > 0) {
      // Mappiamo le righe dal server nel nuovo formato a due colonne
      const mappedRighe = data.righe.map((r: any) => {
        const contoId = typeof r.conto === "object" ? r.conto?.id : r.conto;
        const contoObj = mastrini.find((m: any) => m.id === contoId);

        return {
          conto: contoObj || null,
          dare: r.sezione === "D" ? String(r.importo) : "",
          avere: r.sezione === "A" ? String(r.importo) : "",
        };
      });
      setRighe(mappedRighe);
    } else {
      setRighe([rigaVuota(), rigaVuota()]);
    }
  }, [data, mastrini]);

  // Calcoli per la quadratura
  const totDare = useMemo(
    () => righe.reduce((acc, r) => acc + Number(r.dare || 0), 0),
    [righe],
  );

  const totAvere = useMemo(
    () => righe.reduce((acc, r) => acc + Number(r.avere || 0), 0),
    [righe],
  );

  const isQuadraturaOk = totDare === totAvere && totDare > 0;

  const isFormCompleto =
    descrizione.trim() !== "" &&
    righe.every((r) => r.conto !== null && (r.dare !== "" || r.avere !== ""));

  if (!data) return null;

  const handleClose = () => {
    setData(null);
  };

  const updateRiga = (index: number, campo: keyof RigaForm, valore: any) => {
    setRighe((prev) => {
      const copy = [...prev];

      if (campo === "dare") {
        copy[index] = {
          ...copy[index],
          dare: valore,
          avere: valore !== "" ? "" : copy[index].avere,
        };
      } else if (campo === "avere") {
        copy[index] = {
          ...copy[index],
          avere: valore,
          dare: valore !== "" ? "" : copy[index].dare,
        };
      } else {
        copy[index] = { ...copy[index], [campo]: valore };
      }

      return copy;
    });
  };

  const addRiga = () => setRighe([...righe, rigaVuota()]);

  const removeRiga = (index: number) => {
    if (righe.length <= 2) return;
    setRighe(righe.filter((_, i) => i !== index));
  };

  const save = async () => {
    if (!isQuadraturaOk || !isFormCompleto) {
      alert(
        "Assicurati che tutti i campi siano compilati e che Dare e Avere quadrino.",
      );
      return;
    }

    // Riformattiamo il payload per il backend
    const payloadRighe = righe.map((r) => ({
      conto: r.conto.id,
      sezione: Number(r.dare) > 0 ? "D" : "A",
      importo: Number(r.dare) > 0 ? parseFloat(r.dare) : parseFloat(r.avere),
    }));

    try {
      await api.put(`/operazioni/${data.id}/`, {
        esercizio: data.esercizio,
        data: dataOp,
        descrizione: descrizione,
        righe: payloadRighe,
      });

      handleClose();
      refresh();
    } catch (error) {
      console.error("Errore nella modifica", error);
      alert("Errore durante la modifica dell'operazione contabile.");
    }
  };

  return (
    <Dialog open={Boolean(data)} fullWidth maxWidth="md" onClose={handleClose}>
      <DialogTitle>Modifica Operazione Contabile</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} mt={1}>
          {/* Testata */}
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              type="date"
              label="Data"
              InputLabelProps={{ shrink: true }}
              value={dataOp}
              onChange={(e) => setDataOp(e.target.value)}
              sx={{ width: 150 }}
              size="small"
            />
            <TextField
              label="Descrizione"
              fullWidth
              value={descrizione}
              onChange={(e) => setDescrizione(e.target.value)}
              size="small"
            />
          </Stack>

          <Divider />

          {/* Intestazioni Colonne Righe */}
          <Stack direction="row" spacing={2} sx={{ px: 1 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ flexGrow: 1 }}
            >
              CONTO
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ width: 120, textAlign: "center" }}
            >
              DARE €
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ width: 120, textAlign: "center" }}
            >
              AVERE €
            </Typography>
            <Box sx={{ width: 40 }} /> {/* Spazio per il cestino */}
          </Stack>

          {/* Righe dell'Operazione */}
          <Stack spacing={1.5}>
            {righe.map((riga, i) => (
              <Stack key={i} direction="row" spacing={2} alignItems="center">
                <Autocomplete
                  size="small"
                  sx={{ flexGrow: 1 }}
                  options={mastrini}
                  value={riga.conto}
                  getOptionLabel={(o: any) => o?.label || o?.nome || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.id === value?.id
                  }
                  onChange={(_, v) => updateRiga(i, "conto", v)}
                  renderInput={(p) => (
                    <TextField {...p} placeholder="Cerca conto..." />
                  )}
                />

                <TextField
                  placeholder="0.00"
                  type="number"
                  size="small"
                  sx={{ width: 120 }}
                  value={riga.dare}
                  onChange={(e) => updateRiga(i, "dare", e.target.value)}
                  inputProps={{ style: { textAlign: "right" } }}
                />

                <TextField
                  placeholder="0.00"
                  type="number"
                  size="small"
                  sx={{ width: 120 }}
                  value={riga.avere}
                  onChange={(e) => updateRiga(i, "avere", e.target.value)}
                  inputProps={{ style: { textAlign: "right" } }}
                />

                <IconButton
                  color="error"
                  onClick={() => removeRiga(i)}
                  disabled={righe.length <= 2}
                  sx={{ width: 40 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          <Button
            startIcon={<AddIcon />}
            onClick={addRiga}
            variant="outlined"
            size="small"
            sx={{ alignSelf: "flex-start" }}
          >
            Aggiungi Riga
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
        <Typography
          variant="body1"
          color={totDare !== totAvere ? "error" : "textSecondary"}
        >
          Tot. Dare: <strong>{totDare.toFixed(2)}</strong> | Tot. Avere:{" "}
          <strong>{totAvere.toFixed(2)}</strong>
        </Typography>

        <Box>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Annulla
          </Button>
          <Button
            variant="contained"
            onClick={save}
            disabled={!isQuadraturaOk || !isFormCompleto}
          >
            Salva Modifiche
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
