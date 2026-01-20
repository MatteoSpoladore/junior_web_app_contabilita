import { Box, Container, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import GridTheoryBackground from "./GridTheoryBackground";
import TheoryHeader from "./TheoryHeader";
import TheorySidebar from "./TheorySidebar";
import TheoryNextPrevNavigation from "./TheoryNextPrevNavigation";

export default function TheoryLayout() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <GridTheoryBackground>
      {/* HEADER */}
      <TheoryHeader />

      {/* TOGGLE DARK / LIGHT */}
      <Box
        sx={{
          position: "fixed",
          top: 12,
          right: 16,
          zIndex: 1300,
        }}
      >
        <IconButton
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          sx={{
            bgcolor: "var(--bg-box)",
            border: "1px solid var(--border-color)",
          }}
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", mt: 8 }}>
        {/* SIDEBAR */}
        <TheorySidebar />

        {/* CONTENT */}
        <Box sx={{ flex: 1, pb: 10 }}>
          <Container
            maxWidth="md"
            sx={{
              backgroundColor: "var(--bg-box)",
              color: "var(--text-main)",
              borderRadius: 4,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              px: 4,
              py: 5,
              mt: 2,
              border: "1px solid var(--border-color)",
            }}
          >
            <TheoryNextPrevNavigation margin_bottom={3} margin_top={0} />
            <Outlet />
            <TheoryNextPrevNavigation />
          </Container>
        </Box>
      </Box>
    </GridTheoryBackground>
  );
}
