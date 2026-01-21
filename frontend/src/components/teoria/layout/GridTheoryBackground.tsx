import { Box } from "@mui/material";

export default function GridTheoryBackground({ children }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--bg-main)",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundSize: "40px 40px",
          backgroundPosition: "20px 20px",
          backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          animation: "moveGrid 10s linear infinite",
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>

      <style>
        {`
          @keyframes moveGrid {
            from { background-position: 20px 20px; }
            to { background-position: -20px -20px; }
          }
        `}
      </style>
    </Box>
  );
}
