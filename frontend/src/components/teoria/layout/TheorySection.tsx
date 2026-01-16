import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function TheorySection({ title, children }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 1.5, color: "#1565c0" }}
      >
        {title}
      </Typography>

      {/* ⬇️ CONTENITORE PURO, NESSUNA TYPOGRAPHY */}
      <Box>{children}</Box>
    </Box>
  );
}
