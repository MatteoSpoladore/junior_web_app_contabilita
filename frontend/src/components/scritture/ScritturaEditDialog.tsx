import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Autocomplete,
} from "@mui/material";
import api from "../../api";

export default function ScritturaEditDialog({
  data,
  setData,
  mastrini,
  refresh,
}: any) {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (!data) return;

    const contoDareObj =
      typeof data.conto_dare === "object"
        ? data.conto_dare
        : mastrini.find((m: any) => m.id === data.conto_dare);

    const contoAvereObj =
      typeof data.conto_avere === "object"
        ? data.conto_avere
        : mastrini.find((m: any) => m.id === data.conto_avere);

    setForm({
      ...data,
      conto_dare: contoDareObj || null,
      conto_avere: contoAvereObj || null,
    });
  }, [data, mastrini]);

  if (!form) return null;

  const handleClose = () => {
    setForm(null);
    setData(null); // <-- questo chiude la dialog
  };

  const save = async () => {
    if (!form.conto_dare || !form.conto_avere || !form.importo) {
      alert("Compila tutti i campi obbligatori");
      return;
    }

    await api.put(`/scritture/${form.id}/`, {
      esercizio: form.esercizio,
      data: form.data,
      descrizione: form.descrizione,
      conto_dare: form.conto_dare.id,
      conto_avere: form.conto_avere.id,
      importo: form.importo,
    });

    handleClose(); // <-- chiude la dialog
    refresh();
  };

  return (
    <Dialog open={Boolean(data)} fullWidth maxWidth="sm" onClose={handleClose}>
      <DialogTitle>Modifica Registrazione</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            type="date"
            label="Data"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />

          <TextField
            label="Descrizione"
            fullWidth
            value={form.descrizione}
            onChange={(e) => setForm({ ...form, descrizione: e.target.value })}
          />

          <Autocomplete
            options={mastrini}
            getOptionLabel={(o: any) => o.nome || ""}
            value={form.conto_dare}
            onChange={(_, v) => setForm({ ...form, conto_dare: v })}
            renderInput={(p) => <TextField {...p} label="Conto Dare" />}
          />

          <Autocomplete
            options={mastrini}
            getOptionLabel={(o: any) => o.nome || ""}
            value={form.conto_avere}
            onChange={(_, v) => setForm({ ...form, conto_avere: v })}
            renderInput={(p) => <TextField {...p} label="Conto Avere" />}
          />

          <TextField
            label="Importo"
            type="number"
            fullWidth
            value={form.importo}
            onChange={(e) => setForm({ ...form, importo: e.target.value })}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Annulla</Button>
        <Button variant="contained" onClick={save}>
          Salva Modifiche
        </Button>
      </DialogActions>
    </Dialog>
  );
}
