import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import api from "../../api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void; // Chiamato quando l'esercizio viene creato con successo
}

export default function AddEsercizioDialog({ open, onClose, onSave }: Props) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!nome.trim()) return;
    setLoading(true);
    setError(null);

    try {
      await api.post("/esercizi/", {
        nome: nome.trim(),
      });
      setNome("");
      onSave();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.nome?.[0] ??
          "Errore durante la creazione dell'esercizio."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita il comportamento default
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Inserisci il nome del tuo nuovo esercizio: </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Esercizio..."
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={handleKeyDown} // ← aggiunto
          disabled={loading}
          error={!!error}
          helperText={error || ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Annulla
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          Salva
        </Button>
      </DialogActions>
    </Dialog>
  );
}
