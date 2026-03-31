import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Autocomplete,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api";

// Nuovo tipo di stato: via la "sezione", dentro "dare" e "avere" separati
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

export default function ScritturaForm({ mastrini, esercizioId, onSaved }: any) {
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [descrizione, setDescrizione] = useState("");

  // Inizializziamo con due righe vuote
  const [righe, setRighe] = useState<RigaForm[]>([rigaVuota(), rigaVuota()]);

  // Calcolo dei totali in tempo reale
  const totDare = useMemo(
    () => righe.reduce((acc, r) => acc + Number(r.dare || 0), 0),
    [righe],
  );

  const totAvere = useMemo(
    () => righe.reduce((acc, r) => acc + Number(r.avere || 0), 0),
    [righe],
  );

  const isQuadraturaOk = totDare === totAvere && totDare > 0;

  // Il form è completo se la descrizione c'è e ogni riga ha un conto e ALMENO un importo (Dare o Avere)
  const isFormCompleto =
    descrizione.trim() !== "" &&
    righe.every((r) => r.conto !== null && (r.dare !== "" || r.avere !== ""));

  const updateRiga = (index: number, campo: keyof RigaForm, valore: any) => {
    setRighe((prev) => {
      const copy = [...prev];

      if (campo === "dare") {
        // Se scrivo in Dare, svuoto l'Avere
        copy[index] = {
          ...copy[index],
          dare: valore,
          avere: valore !== "" ? "" : copy[index].avere,
        };
      } else if (campo === "avere") {
        // Se scrivo in Avere, svuoto il Dare
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

  const addRiga = () => {
    setRighe([...righe, rigaVuota()]);
  };

  const removeRiga = (index: number) => {
    if (righe.length <= 2) return;
    setRighe(righe.filter((_, i) => i !== index));
  };

  const save = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!isQuadraturaOk || !isFormCompleto) return;

    // Traduciamo le due colonne (UX) nel formato che il backend si aspetta (DB)
    const payloadRighe = righe.map((r) => ({
      conto: r.conto.id,
      sezione: Number(r.dare) > 0 ? "D" : "A",
      importo: Number(r.dare) > 0 ? parseFloat(r.dare) : parseFloat(r.avere),
    }));

    try {
      await api.post("/operazioni/", {
        esercizio: esercizioId,
        data: data,
        descrizione: descrizione,
        righe: payloadRighe,
      });

      onSaved();
      setDescrizione("");
      setRighe([rigaVuota(), rigaVuota()]);
    } catch (error) {
      console.error("Errore nel salvataggio", error);
      alert("Errore durante il salvataggio dell'operazione");
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <form onSubmit={save}>
          <Stack spacing={3}>
            {/* Testata */}
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                type="date"
                label="Data"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={data}
                onChange={(e) => setData(e.target.value)}
                sx={{ width: 150 }}
              />
              <TextField
                label="Descrizione Operazione"
                size="small"
                fullWidth
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                placeholder="es. Pagamento fornitore con bonifico"
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
                    sx={{ flexGrow: 1 }} // Il conto si prende tutto lo spazio disponibile
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
                    inputProps={{ style: { textAlign: "right" } }} // Allinea i numeri a destra
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

            {/* Footer con Totali e Bottoni */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pt: 1 }}
            >
              <Button
                startIcon={<AddIcon />}
                onClick={addRiga}
                variant="text"
                size="small"
              >
                Aggiungi Riga
              </Button>

              <Box display="flex" alignItems="center" gap={3}>
                <Typography
                  variant="body1"
                  color={totDare !== totAvere ? "error" : "textSecondary"}
                >
                  Tot. Dare: <strong>{totDare.toFixed(2)}</strong> | Tot. Avere:{" "}
                  <strong>{totAvere.toFixed(2)}</strong>
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isQuadraturaOk || !isFormCompleto}
                >
                  Registra Operazione
                </Button>
              </Box>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
