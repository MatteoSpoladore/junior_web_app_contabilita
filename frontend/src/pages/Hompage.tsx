import { Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GridBackground from "../components/layout/GridBackGround";

export default function Homepage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const handleAccess = () => {
    if (token) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  };

  const handleTheory = () => {
    navigate("/teoria/indice");
  };

  return (
    <GridBackground>
      <Stack
        spacing={4}
        alignItems="center"
        textAlign="center"
        sx={{ px: 2, position: "relative", zIndex: 1 }}
      >
        <MenuBookIcon sx={{ fontSize: 72, color: "#1976d2" }} />

        <Typography variant="h3" fontWeight={700}>
          Scritture contabili, semplici e chiare
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.85, maxWidth: 600 }}>
          Accedi alla tua area personale per esercitarti con la partita doppia,
          registrare la prima nota e gestire i tuoi esercizi contabili.
        </Typography>

        <Button
          size="large"
          variant="contained"
          onClick={handleAccess}
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 600,
            borderRadius: 3,
            backgroundColor: "#1976d2",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Accedi ai tuoi esercizi contabili
        </Button>
        <Typography variant="h6" sx={{ opacity: 0.85, maxWidth: 600 }}>
          Visualizza i principali concetti teorici della contabilità analitica e
          generale
        </Typography>

        <Button
          size="large"
          variant="contained"
          onClick={handleTheory}
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 600,
            borderRadius: 3,
            backgroundColor: "#1976d2",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Visualizza la teoria contabile
        </Button>
      </Stack>
    </GridBackground>
  );
}
