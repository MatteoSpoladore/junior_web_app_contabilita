import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import api from "@/api";

interface Studente {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

// Aggiungiamo le Props per far comunicare questo componente con l'esterno
interface TeacherDashboardProps {
  onSelectStudent: (studente: Studente) => void;
}

export default function TeacherDashboard({
  onSelectStudent,
}: TeacherDashboardProps) {
  const [studenti, setStudenti] = useState<Studente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("auth/studenti/")
      .then((res) => setStudenti(res.data))
      .catch((err) => {
        console.error(err);
        setError("Errore durante il caricamento degli studenti.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box flex={1} p={3} mt={6}>
      <Typography variant="h4" mb={1}>
        Pannello Professore
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Gestione e monitoraggio della tua classe
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : studenti.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Non hai ancora nessuno studente assegnato.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {studenti.map((studente) => (
            <Grid item xs={12} sm={6} md={4} key={studente.id}>
              {/* Quando clicchi la Card, attiva la funzione onSelectStudent */}
              <Card
                onClick={() => onSelectStudent(studente)}
                sx={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    cursor: "pointer",
                    borderColor: "var(--info-accent)",
                  },
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Avatar sx={{ bgcolor: "var(--info-accent)" }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                      {studente.first_name || studente.last_name
                        ? `${studente.first_name} ${studente.last_name}`
                        : studente.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {studente.email}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
