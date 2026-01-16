import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputAdornment,
  LinearProgress,
  CircularProgress,
  Tooltip,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "./auth";
import { useNavigate } from "react-router-dom";
import GridBackground from "../../components/layout/GridBackGround";

export default function Register() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const strength = calculateStrength(form.password);
  const rules = passwordRules(form.password);

  /* ---------------- Submit ---------------- */

  async function submit(event?: React.FormEvent) {
    if (event) event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErr("⚠ Le password non coincidono");
      return;
    }

    setErr("");
    setLoading(true);

    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword,
      });
      alert("Registrazione completata!");
      navigate("/login");
    } catch (e: any) {
      const d = e.response?.data;
      setErr(d?.email || d?.username || d?.password || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  }

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
          key={label}
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

  /* ---------------- Render ---------------- */

  return (
    <GridBackground>
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          mx: 2,
          p: 3,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.55)",
        }}
      >
        <CardContent>
          <Typography variant="h5" mb={2}>
            Crea Account
          </Typography>

          <form onSubmit={submit}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* Password con tooltip */}
            <Tooltip
              title={passwordHint}
              placement="right"
              arrow
              open={Boolean(form.password)}
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
                  sx: {
                    color: "#f9f9f9",
                  },
                },
              }}
            > 
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={show ? "text" : "password"}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShow(!show)}>
                        {show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>

            <LinearProgress
              variant="determinate"
              value={strength}
              color={getStrengthColor(strength)}
              sx={{ my: 1 }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Conferma password"
              type={show ? "text" : "password"}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />

            {err && (
              <Typography color="error" mt={1}>
                {err}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Registrati"
              )}
            </Button>
          </form>

          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/login")}>
            Hai già un account? Login
          </Button>
        </CardContent>
      </Card>
    </GridBackground>
  );
}

// import { useState } from "react";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   InputAdornment,
//   LinearProgress,
//   CircularProgress,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { register } from "./auth";
// import { useNavigate } from "react-router-dom";
// import GridBackground from "../../components/layout/GridBackGround";

// export default function Register() {
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [err, setErr] = useState("");
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   function calculateStrength(password: string) {
//     let score = 0;
//     if (!password) return 0;
//     if (password.length >= 1) score += 10;
//     if (password.length >= 8) score += 25;
//     if (password.length >= 12) score += 10;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
//     if (/\d/.test(password)) score += 20;
//     if (/[\W_]/.test(password)) score += 25;

//     return Math.min(score, 100);
//   }

//   function getStrengthColor(strength: number) {
//     if (strength === 0) return "white";
//     if (strength < 40) return "error";
//     if (strength < 70) return "warning";
//     return "success";
//   }

//   const strength = calculateStrength(form.password);

//   async function submit(event?: React.FormEvent) {
//     if (event) event.preventDefault();
//     if (form.password !== form.confirmPassword)
//       return setErr("⚠ Le password non coincidono");

//     setErr("");
//     setLoading(true);
//     try {
//       await register({
//         username: form.username,
//         email: form.email,
//         password: form.password,
//         confirm_password: form.confirmPassword,
//       });
//       alert("Registrazione completata!");
//       navigate("/login");
//     } catch (e: any) {
//       const d = e.response?.data;
//       setErr(d?.email || d?.username || d?.password || "Errore sconosciuto");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <GridBackground>
//       <Card
//         sx={{
//           maxWidth: 400,
//           width: "100%",
//           mx: 2,
//           p: 3,
//           boxShadow: "0 10px 40px rgba(0, 0, 0, 0.55)",
//         }}
//       >
//         <CardContent>
//           <Typography variant="h5" mb={2}>
//             Crea Account
//           </Typography>

//           <form onSubmit={submit}>
//             <TextField
//               fullWidth
//               label="Username"
//               margin="normal"
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//             />

//             <TextField
//               fullWidth
//               label="Email"
//               margin="normal"
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />

//             <TextField
//               fullWidth
//               margin="normal"
//               label="Password"
//               type={show ? "text" : "password"}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShow(!show)}>
//                       {show ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <LinearProgress
//               variant="determinate"
//               value={strength}
//               color={getStrengthColor(strength)}
//               sx={{ my: 1 }}
//             />

//             <TextField
//               fullWidth
//               margin="normal"
//               label="Conferma password"
//               type={show ? "text" : "password"}
//               onChange={(e) =>
//                 setForm({ ...form, confirmPassword: e.target.value })
//               }
//             />

//             {err && (
//               <Typography color="error" mt={1}>
//                 {err}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{ mt: 2 }}
//               disabled={loading}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Registrati"
//               )}
//             </Button>
//           </form>

//           <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/login")}>
//             Hai già un account? Login
//           </Button>
//           <Button fullWidth sx={{ mt: 1 }} onClick={() => nav("/home")}>
//             Torna alla Homepage
//           </Button>
//         </CardContent>
//       </Card>
//     </GridBackground>
//   );
// }
