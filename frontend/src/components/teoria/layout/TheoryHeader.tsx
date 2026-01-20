import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TheoryHeader() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        backgroundColor: "var(--bg-box)",
        color: "var(--text-main)",
        borderBottom: "1px solid var(--border-color)",
      }}
      elevation={0}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Teoria – Contabilità
        </Typography>

        <Button
          onClick={() => navigate("/home")}
          sx={{
            color: "var(--text-main)",
            fontWeight: 600,
          }}
        >
          Torna alla Homepage
        </Button>
      </Toolbar>
    </AppBar>
  );
}
