import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  esercizio: any | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteEsercizioDialog({
  open,
  esercizio,
  onClose,
  onConfirm,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onConfirm();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} onKeyDown={handleKeyDown}>
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
        <Button onClick={onClose} color="inherit">
          Annulla
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Elimina
        </Button>
      </DialogActions>
    </Dialog>
  );
}
