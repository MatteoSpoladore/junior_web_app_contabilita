import { Typography } from "@mui/material";

export default function TheoryTitle({ children }: { children: string }) {
  return (
    <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: "#1976d2" }}>
      {children}
    </Typography>
  );
}
