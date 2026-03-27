import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "@/api";
import type { Esercizio } from "@/types";

export default function StudentDetail() {
  const { id } = useParams(); // <-- ID DELL'ALUNNO (es: /app/alunno/5)
  const navigate = useNavigate();

  const [studente, setStudente] = useState<any>(null);
  const [esercizi, setEsercizi] = useState<Esercizio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Scarichiamo la lista degli alunni per trovare il nome, poi scarichiamo i suoi esercizi
    api
      .get("auth/studenti/")
      .then((res) => {
        const alunnoTrovato = res.data.find((s: any) => s.id === Number(id));
        if (alunnoTrovato) {
          setStudente(alunnoTrovato);
          // Passiamo alla seconda chiamata per gli esercizi
          return api.get(`/esercizi/?alunno_id=${id}`);
        } else {
          throw new Error("Alunno non trovato o non autorizzato");
        }
      })
      .then((res) => {
        if (res) setEsercizi(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/app"); // Se c'è un errore (es. prova a spiare un altro alunno), lo rimandiamo alla Home
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const nomeDisplay = studente?.first_name || studente?.username || "Alunno";

  return (
    <Box flex={1} p={3} pt={2}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/app")}
        sx={{ mb: 3 }}
      >
        Torna alla Classe
      </Button>

      <Typography variant="h4" mb={1}>
        Esercizi di {nomeDisplay}
      </Typography>

      {esercizi.length === 0 ? (
        <Typography mt={3} color="text.secondary">
          L'alunno non ha ancora creato esercizi.
        </Typography>
      ) : (
        <Grid container spacing={2} mt={2}>
          {esercizi.map((es) => (
            <Grid item xs={12} sm={6} md={4} key={es.id}>
              <Card
                onClick={() => navigate(`/app/esercizio/${es.id}`)} // <-- NAVIGHIAMO TRAMITE URL
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "var(--hover-bg)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6">{es.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Clicca per visualizzare la dashboard
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
