// ThemeToggle.tsx
import { IconButton } from "@mui/material";
import type { SxProps } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle({ sx }: { sx?: SxProps }) {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      sx={{
        bgcolor: "var(--bg-box)",
        border: "1px solid var(--border-color)",
        color: "var(--text-main)",
        transition: "all 0.5s ease",

        ...sx,
      }}
      title={theme === "light" ? "Passa a tema scuro" : "Passa a tema chiaro"} // ← tooltip nativo
    >
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
