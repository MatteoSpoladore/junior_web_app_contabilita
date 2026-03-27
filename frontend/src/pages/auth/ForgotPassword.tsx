import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import api from "../../api";
import GridBackground from "../../components/layout/GridBackGround";
import ThemeToggle from "../../components/teoria/layout/ThemeToggle";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setErr("");

    try {
      const response = await api.post("auth/password-reset/", { email });
      setMessage(response.data.detail);
      setEmail("");
    } catch (error: any) {
      setErr(
        error.response?.data?.email?.[0] ||
          "Si è verificato un errore durante la richiesta.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <GridBackground>
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
        <ThemeToggle />
      </Box>
      <Card
        sx={{
          maxWidth: 350,
          width: "100%",
          mx: 2,
          p: 3,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.55)",
        }}
      >
        <CardContent>
          <Typography variant="h5" mb={2}>
            Recupero Password
          </Typography>

          {message && (
            <Typography color="success.main" mb={2} variant="body2">
              {message}
            </Typography>
          )}

          <form onSubmit={submit} noValidate>
            <TextField
              fullWidth
              label="Email registrata"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (err) setErr("");
              }}
              required
              disabled={loading || !!message}
              error={!!err}
              helperText={err}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
              disabled={loading || !email || !!message}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Invia link di recupero"
              )}
            </Button>
          </form>

          <Button fullWidth sx={{ mt: 1 }} onClick={() => nav("/login")}>
            Torna al Login
          </Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => nav("/home")}>
            Torna alla Homepage
          </Button>
        </CardContent>
      </Card>
    </GridBackground>
  );
}

// MATRICE NO STYLE
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api"; // Utilizziamo l'istanza axios che hai già configurato

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       // Chiamiamo l'endpoint che abbiamo creato nel backend
//       const response = await api.post("auth/password-reset/", { email });
//       // Se va a buon fine, mostriamo il messaggio di successo restituito dal server
//       setMessage(response.data.detail);
//       setEmail(""); // Svuotiamo il campo
//     } catch (err: any) {
//       // Se c'è un errore (es. server irraggiungibile o validazione fallita)
//       setError(
//         err.response?.data?.email?.[0] ||
//           "Si è verificato un errore durante la richiesta.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       {" "}
//       {/* Usa le classi CSS che usi già per Login/Register */}
//       <h2>Recupero Password</h2>
//       {message && (
//         <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>
//       )}
//       {error && (
//         <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email registrata</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             disabled={isLoading}
//           />
//         </div>

//         <button type="submit" disabled={isLoading || !email}>
//           {isLoading ? "Invio in corso..." : "Invia link di recupero"}
//         </button>
//       </form>
//       <div style={{ marginTop: "15px" }}>
//         <Link to="/login">Torna al Login</Link>
//       </div>
//     </div>
//   );
// }
