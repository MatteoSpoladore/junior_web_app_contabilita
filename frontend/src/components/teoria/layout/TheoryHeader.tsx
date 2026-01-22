import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface TheoryHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function TheoryHeader({
  sidebarOpen,
  onToggleSidebar,
}: TheoryHeaderProps) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        backgroundColor: "var(--bg-box)",
        color: "var(--text-main)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <Toolbar>
        {/* Toggle sidebar */}
        <IconButton
          onClick={onToggleSidebar}
          edge="start"
          sx={{ mr: 2, color: "var(--text-main)" }}
          aria-label={sidebarOpen ? "Chiudi indice" : "Apri indice"}
        >
          <Menu />
        </IconButton>

        {/* Titolo */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Teoria – Contabilità
        </Typography>

        {/* Azioni a destra */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <ThemeToggle />

          <Button
            onClick={() => navigate("/home")}
            sx={{ color: "var(--text-main)", fontWeight: 600 }}
          >
            Torna alla Homepage
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function TheoryHeader() {
//   const navigate = useNavigate();

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (t) => t.zIndex.drawer + 1,
//         backgroundColor: "var(--bg-box)",
//         color: "var(--text-main)",
//         borderBottom: "1px solid var(--border-color)",
//       }}
//       elevation={0}
//     >
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//           Teoria – Contabilità
//         </Typography>

//         <Button
//           onClick={() => navigate("/home")}
//           sx={{
//             color: "var(--text-main)",
//             fontWeight: 600,
//           }}
//         >
//           Torna alla Homepage
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// }
