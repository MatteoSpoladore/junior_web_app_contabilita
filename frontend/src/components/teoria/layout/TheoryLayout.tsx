import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import GridTheoryBackground from "./GridTheoryBackground";
import TheoryHeader from "./TheoryHeader";
import TheorySidebar from "./TheorySidebar";
import TheoryNextPrevNavigation from "./TheoryNextPrevNavigation";

export default function TheoryLayout() {
  return (
    <GridTheoryBackground>
      <TheoryHeader />

      <Box sx={{ display: "flex", mt: 8 }}>
        {/* SIDEBAR */}
        <TheorySidebar />

        {/* CONTENT */}
        <Box sx={{ flex: 1, pb: 10 }}>
          <Container
            maxWidth="md"
            sx={{
              backgroundColor: "#fff",
              borderRadius: 4,
              boxShadow: 3,
              px: 4,
              py: 5,
              mt: 2,
            }}
          >
            <Outlet />

            {/* NAVIGAZIONE FINALE */}
            <TheoryNextPrevNavigation />
          </Container>
        </Box>
      </Box>
    </GridTheoryBackground>
  );
}
