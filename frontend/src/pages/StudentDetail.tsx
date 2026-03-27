import { useState, useEffect } from "react";
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

interface Props {
  studente: any;
  onBack: () => void;
  onSelectEsercizio: (esercizio: Esercizio) => void;
}

export default function StudentDetail({
  studente,
  onBack,
  onSelectEsercizio,
}: Props) {
  const [esercizi, setEsercizi] = useState<Esercizio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Il nuovo endpoint del backend che abbiamo preparato nello Step 1
    api
      .get(`/esercizi/?alunno_id=${studente.id}`)
      .then((res) => setEsercizi(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [studente.id]);

  const nomeDisplay = studente.first_name || studente.username;

  return (
    <Box flex={1} p={3} mt={6}>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 3 }}>
        Torna alla Classe
      </Button>

      <Typography variant="h4" mb={1}>
        Esercizi di {nomeDisplay}
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : esercizi.length === 0 ? (
        <Typography mt={3} color="text.secondary">
          L'alunno non ha ancora creato esercizi.
        </Typography>
      ) : (
        <Grid container spacing={2} mt={2}>
          {esercizi.map((es) => (
            <Grid item xs={12} sm={6} md={4} key={es.id}>
              <Card
                onClick={() => onSelectEsercizio(es)}
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
