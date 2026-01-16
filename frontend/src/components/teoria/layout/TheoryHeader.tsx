import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TheoryHeader() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          Teoria – Contabilità
        </Typography>

        <Button
          color="inherit"
          onClick={() => navigate("/home")}
          sx={{ fontWeight: 600 }}
        >
          Torna alla Homepage
        </Button>
      </Toolbar>
    </AppBar>
  );
}
