import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "@/api"; // Importiamo l'API direttamente qui!

interface Props {
  open: boolean;
  esercizio: any | null;
  eserciziUtente: { nome: string; id: number }[];
  onClose: () => void;
  onSuccess: () => void; // Cambiato da onSave a onSuccess
}

export default function EditDialogEsercizio({
  open,
  esercizio,
  eserciziUtente,
  onClose,
  onSuccess,
}: Props) {
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Stato per il bottoncino

  useEffect(() => {
    if (esercizio && open) {
      setNome(esercizio.nome);
      setError("");
    }
  }, [esercizio, open]);

  const handleSave = async () => {
    const trimmedNome = nome.trim();
    if (!trimmedNome) return;

    if (trimmedNome === esercizio?.nome) {
      onClose();
      return;
    }

    const nomeEsistente = eserciziUtente.some(
      (e) =>
        e.nome.toLowerCase() === trimmedNome.toLowerCase() &&
        e.id !== esercizio?.id,
    );

    if (nomeEsistente) {
      setError("Esiste già un esercizio con questo nome.");
      return;
    }

    // --- CHIAMATA API SPOSTATA QUI DENTRO ---
    setLoading(true);
    try {
      await api.put(`/esercizi/${esercizio.id}/`, { nome: trimmedNome });
      onSuccess(); // Avvisa la sidebar di ricaricare la lista
      onClose(); // Chiudi la finestra
    } catch (err) {
      setError("Errore durante il salvataggio.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : undefined}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Modifica esercizio</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome esercizio"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) handleSave();
          }}
          error={!!error}
          helperText={error}
          disabled={loading} // Blocca l'input mentre carica
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Annulla
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Salva"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
