import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  esercizio: any | null;
  eserciziUtente: { nome: string; id: number }[]; // lista degli esercizi dell'utente
  onClose: () => void;
  onSave: (nome: string) => void;
}

export default function EditEsercizioDialog({
  open,
  esercizio,
  eserciziUtente,
  onClose,
  onSave,
}: Props) {
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (esercizio) {
      setNome(esercizio.nome);
      setError("");
    }
  }, [esercizio]);

  const handleSave = () => {
    const trimmedNome = nome.trim();
    if (!trimmedNome) return;

    // Se il nome non è cambiato, chiudi semplicemente il dialog
    if (trimmedNome === esercizio?.nome) {
      onSave(trimmedNome); // aggiorna stato locale
      onClose(); // chiudi dialog
      return;
    }

    // Controllo duplicati solo se il nome è cambiato
    const nomeEsistente = eserciziUtente.some(
      (e) =>
        e.nome.toLowerCase() === trimmedNome.toLowerCase() &&
        e.id !== esercizio?.id
    );

    if (nomeEsistente) {
      setError("Esiste già un esercizio con questo nome. Cambialo.");
      return;
    }

    onSave(trimmedNome); // qui il backend verrà chiamato dal genitore
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifica esercizio</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome esercizio"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={error}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Annulla
        </Button>
        <Button onClick={handleSave} variant="contained">
          Salva
        </Button>
      </DialogActions>
    </Dialog>
  );
}
