import { Box, Typography } from "@mui/material";

export default function TheoryBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        borderLeft: "5px solid #1976d2",
        backgroundColor: "#e3f2fd",
        p: 2.5,
        mb: 4,
        borderRadius: 2,
      }}
    >
      <Typography fontWeight={600} sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2">{children}</Typography>
    </Box>
  );
}
