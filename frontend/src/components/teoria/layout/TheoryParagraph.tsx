import { Typography } from "@mui/material";

export default function TheoryParagraph({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography component="p" variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
      {children}
    </Typography>
  );
}
