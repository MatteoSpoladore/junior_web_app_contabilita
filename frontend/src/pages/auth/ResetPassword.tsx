import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  LinearProgress,
  Tooltip,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "@/api";
import GridBackground from "@/components/layout/GridBackGround";
import ThemeToggle from "@/components/teoria/layout/ThemeToggle";

// inglobata anche la logica di difficoltà password di Register
export default function ResetPassword() {
  const { uid, token } = useParams();
  const nav = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  /* ---------------- Password utils ---------------- */
  function calculateStrength(password: string) {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 1) score += 10;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 10;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[\W_]/.test(password)) score += 25;
    return Math.min(score, 100);
  }

  function getStrengthColor(strength: number) {
    if (strength === 0) return "inherit";
    if (strength < 40) return "error";
    if (strength < 70) return "warning";
    return "success";
  }

  function passwordRules(password: string) {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[\W_]/.test(password),
    };
  }

  const strength = calculateStrength(newPassword);
  const rules = passwordRules(newPassword);

  /* ---------------- Password tooltip ---------------- */
  const passwordHint = (
    <Box sx={{ fontSize: 13 }}>
      <Typography variant="subtitle2" mb={0.5}>
        La password deve contenere:
      </Typography>

      {[
        ["Almeno 8 caratteri", rules.length],
        ["Una lettera minuscola", rules.lowercase],
        ["Una lettera maiuscola", rules.uppercase],
        ["Un numero", rules.number],
        ["Un carattere speciale", rules.special],
      ].map(([label, ok]) => (
        <Typography
          key={label as string}
          sx={{
            color: ok ? "success.main" : "text.secondary",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {ok ? "✔" : "•"} {label}
        </Typography>
      ))}
    </Box>
  );

  /* ---------------- Submit ---------------- */
  async function submit(event: React.FormEvent) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErr("Le password non corrispondono.");
      return;
    }

    setLoading(true);
    setMessage("");
    setErr("");

    try {
      const response = await api.post("auth/password-reset-confirm/", {
        uid,
        token,
        new_password: newPassword,
      });

      setMessage(response.data.detail);

      setTimeout(() => {
        nav("/login");
      }, 3000);
    } catch (error: any) {
      setErr(
        error.response?.data?.detail ||
          error.response?.data?.new_password?.[0] ||
          "Errore durante il reset. Il link potrebbe essere scaduto.",
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
          maxWidth: 400, // Leggermente allargata per ospitare comodamente il tooltip
          width: "100%",
          mx: 2,
          p: 3,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.55)",
        }}
      >
        <CardContent>
          <Typography variant="h5" mb={2}>
            Nuova Password
          </Typography>

          {message && (
            <Typography color="success.main" mb={2} variant="body2">
              {message} <br />
              <i>Reindirizzamento al login in corso...</i>
            </Typography>
          )}

          {!message && (
            <form onSubmit={submit} noValidate>
              {/* Tooltip avvolge il campo della nuova password */}
              <Tooltip
                title={passwordHint}
                placement="right"
                arrow
                open={Boolean(newPassword)}
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#f9f9f9",
                      color: "text.primary",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      fontSize: 13,
                    },
                  },
                  arrow: {
                    sx: { color: "#f9f9f9" },
                  },
                }}
              >
                <TextField
                  fullWidth
                  label="Nuova Password"
                  margin="normal"
                  type={show ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (err) setErr("");
                  }}
                  required
                  disabled={loading}
                  error={!!err}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShow((prev) => !prev)}
                          edge="end"
                        >
                          {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Tooltip>

              {/* Barra di progresso colorata */}
              <LinearProgress
                variant="determinate"
                value={strength}
                color={getStrengthColor(strength) as any}
                sx={{ my: 1 }}
              />

              <TextField
                fullWidth
                label="Conferma Nuova Password"
                margin="normal"
                type={show ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (err) setErr("");
                }}
                required
                disabled={loading}
                error={!!err}
                helperText={err}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                disabled={loading || !newPassword || !confirmPassword}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Salva Password"
                )}
              </Button>
            </form>
          )}

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
// import { useParams, useNavigate, Link } from "react-router-dom";
// import api from "../../api";

// export default function ResetPassword() {
//   // useParams estrae automaticamente :uid e :token dall'URL del browser
//   const { uid, token } = useParams();
//   const navigate = useNavigate();

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validazione base lato client: le password devono coincidere
//     if (newPassword !== confirmPassword) {
//       setError("Le password non corrispondono.");
//       return;
//     }

//     setIsLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       // Invia i dati esatti che il nostro backend si aspetta (vedi PasswordResetConfirmSerializer)
//       const response = await api.post("auth/password-reset-confirm/", {
//         uid,
//         token,
//         new_password: newPassword, // Nota: il backend aspetta 'new_password'
//       });

//       setMessage(response.data.detail);

//       // UX: Se ha successo, aspetta 3 secondi e poi riporta l'utente alla schermata di login
//       setTimeout(() => {
//         navigate("/login");
//       }, 3000);
//     } catch (err: any) {
//       // Catturiamo gli errori (es. token scaduto, password troppo corta per Django)
//       setError(
//         err.response?.data?.detail ||
//           err.response?.data?.new_password?.[0] ||
//           "Errore durante il reset. Il link potrebbe essere scaduto o non valido.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Imposta Nuova Password</h2>

//       {/* Messaggi di feedback */}
//       {message && (
//         <div style={{ color: "green", marginBottom: "15px" }}>
//           {message} <br /> <i>Reindirizzamento al login in corso...</i>
//         </div>
//       )}
//       {error && (
//         <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
//       )}

//       {/* Nascondiamo il form se il reset è andato a buon fine */}
//       {!message && (
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="newPassword">Nuova Password</label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Conferma Nuova Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading || !newPassword || !confirmPassword}
//           >
//             {isLoading ? "Salvataggio..." : "Salva Nuova Password"}
//           </button>
//         </form>
//       )}

//       <div style={{ marginTop: "15px" }}>
//         <Link to="/login">Torna al Login</Link>
//       </div>
//     </div>
//   );
// }
