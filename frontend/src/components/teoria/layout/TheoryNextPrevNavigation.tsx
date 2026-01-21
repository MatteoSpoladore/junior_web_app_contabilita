import { Box, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { theoryRoutes } from "./TheoryRoutes";

export default function TheoryNextPrevNavigation({
  margin_top = 6,
  margin_bottom = 0,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split("/").pop();

  const currentIndex = theoryRoutes.findIndex((r) => r.path === currentPath);
  // const currentIndex = theoryRoutes.findIndex(
  //   (r) => r.path === location.pathname,
  // );

  if (currentIndex === -1) return null;

  const prev = theoryRoutes[currentIndex - 1];
  const next = theoryRoutes[currentIndex + 1];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: margin_top,
        mb: margin_bottom,
      }}
    >
      {prev ? (
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(`/teoria/${prev.path}`)}
        >
          {prev.label}
        </Button>
      ) : (
        <span />
      )}

      {next && (
        <Button
          endIcon={<ArrowForward />}
          variant="contained"
          onClick={() => navigate(`/teoria/${next.path}`)}
        >
          {next.label}
        </Button>
      )}
    </Box>
  );
}
