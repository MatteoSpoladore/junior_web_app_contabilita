import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddEsercizioDialog from "./AddEsercizioDialog";

interface Props {
  refresh: () => void;
  open: boolean;
}

export default function AddEsercizioButton({ refresh, open }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          width: open ? 180 : 40,
          transition: "width 0.3s ease",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            minWidth: 0,
            height: 35,
            width: "100%",
            "& .MuiButton-startIcon": {
              marginRight: open ? 1 : 0,
            },
          }}
        >
          {open && (
            <Box
              component="span"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "0.8rem",
              }}
            >
              Nuovo esercizio
            </Box>
          )}
        </Button>
      </Box>

      <AddEsercizioDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={refresh}
      />
    </>
  );
}
