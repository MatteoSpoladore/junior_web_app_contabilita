import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "./auth";
import { useNavigate } from "react-router-dom";
import GridBackground from "../../components/layout/GridBackGround";

export default function Login() {
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await login({ username, password });
      nav("/app");
    } catch (error) {
      setErr("Email o password errati");
      setPass(""); // reset password per sicurezza
    } finally {
      setLoading(false);
    }
  }

  return (
    <GridBackground>
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
            Accedi
          </Typography>

          <form onSubmit={submit} noValidate>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => {
                setUser(e.target.value);
                if (err) setErr("");
              }}
              required
              autoComplete="username"
              error={!!err}
            />

            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPass(e.target.value);
                if (err) setErr("");
              }}
              required
              autoComplete="current-password"
              error={!!err}
              helperText={err}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShow((prev) => !prev)}
                      aria-label={
                        show ? "Nascondi password" : "Mostra password"
                      }
                      edge="end"
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <Button fullWidth sx={{ mt: 1 }} onClick={() => nav("/register")}>
            Non hai un account? Registrati
          </Button>

          <Button fullWidth sx={{ mt: 1 }} onClick={() => nav("/home")}>
            Torna alla Homepage
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
//   CircularProgress,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { login } from "./auth";
// import { useNavigate } from "react-router-dom";
// import GridBackground from "../../components/layout/GridBackGround";

// export default function Login() {
//   const [show, setShow] = useState(false);
//   const [err, setErr] = useState("");
//   const [username, setUser] = useState("");
//   const [password, setPass] = useState("");
//   const [loading, setLoading] = useState(false);
//   const nav = useNavigate();

//   async function submit(event) {
//     event.preventDefault();
//     setErr("");
//     setLoading(true);
//     try {
//       await login({ username, password });
//       nav("/app");
//     } catch {
//       setErr("Username o password errati");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <GridBackground>
//       <Card
//         sx={{
//           maxWidth: 350,
//           width: "100%",
//           mx: 2,
//           p: 3,
//           boxShadow: "0 10px 40px rgba(0, 0, 0, 0.55)",
//         }}
//       >
//         <CardContent>
//           <Typography variant="h5" mb={2}>
//             Accedi
//           </Typography>

//           <form onSubmit={submit}>
//             <TextField
//               fullWidth
//               label="Username"
//               margin="normal"
//               value={username}
//               onChange={(e) => setUser(e.target.value)}
//               required
//               autoComplete="username"
//             />

//             <TextField
//               fullWidth
//               label="Password"
//               margin="normal"
//               type={show ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPass(e.target.value)}
//               required
//               autoComplete="current-password"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setShow(!show)}
//                       aria-label={
//                         show ? "Nascondi password" : "Mostra password"
//                       }
//                     >
//                       {show ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {err && (
//               <Typography color="error" mt={1}>
//                 {err}
//               </Typography>
//             )}

//             <Button
//               fullWidth
//               variant="contained"
//               sx={{ mt: 2 }}
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Login"
//               )}
//             </Button>
//           </form>

//           <Button fullWidth sx={{ mt: 1 }} onClick={() => nav("/register")}>
//             Non hai un account? Registrati
//           </Button>
//           <Button fullWidth sx={{ mt: 1 }} onClick={() => nav("/home")}>
//             Torna alla Homepage
//           </Button>
//         </CardContent>
//       </Card>
//     </GridBackground>
//   );
// }
// // import { useState } from "react";
// // import {
// //   TextField,
// //   Button,
// //   Card,
// //   CardContent,
// //   Typography,
// //   IconButton,
// //   InputAdornment,
// //   CircularProgress,
// // } from "@mui/material";
// // import { Visibility, VisibilityOff } from "@mui/icons-material";
// // import { login } from "./auth";
// // import { useNavigate } from "react-router-dom";
// // // import GridBackground from "../../components/layout/GridBackGround";

// // export default function Login() {
// //   const [show, setShow] = useState(false);
// //   const [err, setErr] = useState("");
// //   const [username, setUser] = useState("");
// //   const [password, setPass] = useState("");
// //   const [loading, setLoading] = useState(false); // <-- nuovo stato
// //   const nav = useNavigate();

// //   async function submit(event) {
// //     event.preventDefault();
// //     setErr("");
// //     setLoading(true); // <-- inizio caricamento
// //     try {
// //       await login({ username, password });
// //       nav("/app");
// //     } catch {
// //       setErr("Username o password errati");
// //     } finally {
// //       setLoading(false); // <-- fine caricamento
// //     }
// //   }

// //   return (
// //     <Card sx={{ maxWidth: 350, mx: "auto", mt: 15, p: 3 }}>
// //       <CardContent>
// //         <Typography variant="h5" mb={2}>
// //           Accedi
// //         </Typography>

// //         <form onSubmit={submit}>
// //           <TextField
// //             fullWidth
// //             label="Username"
// //             margin="normal"
// //             value={username}
// //             onChange={(e) => setUser(e.target.value)}
// //             required
// //           />

// //           <TextField
// //             fullWidth
// //             label="Password"
// //             margin="normal"
// //             type={show ? "text" : "password"}
// //             value={password}
// //             onChange={(e) => setPass(e.target.value)}
// //             required
// //             InputProps={{
// //               endAdornment: (
// //                 <InputAdornment position="end">
// //                   <IconButton
// //                     onClick={() => setShow(!show)}
// //                     aria-label={show ? "Nascondi password" : "Mostra password"}
// //                   >
// //                     {show ? <VisibilityOff /> : <Visibility />}
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />

// //           {err && (
// //             <Typography color="error" mt={1}>
// //               {err}
// //             </Typography>
// //           )}

// //           <Button
// //             fullWidth
// //             variant="contained"
// //             sx={{ mt: 2 }}
// //             type="submit"
// //             disabled={loading} // disabilita il pulsante mentre carica
// //           >
// //             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
// //           </Button>
// //         </form>

// //         <Button fullWidth sx={{ mt: 1 }} onClick={() => nav("/register")}>
// //           Non hai un account? Registrati
// //         </Button>
// //       </CardContent>
// //     </Card>
// //   );
// // }
