import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import api from "@/api"; // Importiamo l'API

interface Props {
  open: boolean;
  esercizio: any | null;
  onClose: () => void;
  onSuccess: () => void; // Rinomato per coerenza
}

export default function DeleteDialogEsercizio({
  open,
  esercizio,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!esercizio) return;

    // --- CHIAMATA API SPOSTATA QUI DENTRO ---
    setLoading(true);
    try {
      await api.delete(`/esercizi/${esercizio.id}/`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={!loading ? onClose : undefined}>
      <DialogTitle color="error">Elimina esercizio</DialogTitle>
      <DialogContent>
        <Typography>
          Sei sicuro di voler eliminare <strong>{esercizio?.nome}</strong>?
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Questa azione non può essere annullata.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Annulla
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Elimina"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
