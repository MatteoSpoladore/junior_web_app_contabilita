import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import GridTheoryBackground from "./GridTheoryBackground";
import TheoryHeader from "./TheoryHeader";
import TheorySidebar from "./TheorySidebar";
import TheoryNextPrevNavigation from "./TheoryNextPrevNavigation";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

export default function TheoryLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <GridTheoryBackground>
      {/* HEADER */}
      <TheoryHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <Box
        sx={{
          display: "flex",
          mt: `${HEADER_HEIGHT}px`,
        }}
      >
        {/* SIDEBAR */}
        <TheorySidebar open={sidebarOpen} />

        {/* CONTENT */}
        <Box
          sx={{
            flex: 1,
            ml: sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
            transition: "margin-left 0.3s ease",
            pb: 10,
          }}
        >
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
              transition: "all 0.3s ease",
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

// import { Box, Container } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import ThemeToggle from "./ThemeToggle";
// import GridTheoryBackground from "./GridTheoryBackground";
// import TheoryHeader from "./TheoryHeader";
// import TheorySidebar from "./TheorySidebar";
// import TheoryNextPrevNavigation from "./TheoryNextPrevNavigation";

// export default function TheoryLayout() {
//   return (
//     <GridTheoryBackground>
//       {/* HEADER */}
//       <TheoryHeader />

//       {/* TOGGLE DARK / LIGHT */}
//       <Box
//         sx={{
//           position: "fixed",
//           top: 12,
//           right: 250,
//           zIndex: 1300,
//         }}
//       >
//         <ThemeToggle />
//       </Box>

//       <Box sx={{ display: "flex", mt: 8 }}>
//         {/* SIDEBAR */}
//         <TheorySidebar />

//         {/* CONTENT */}
//         <Box sx={{ flex: 1, pb: 10 }}>
//           <Container
//             maxWidth="md"
//             sx={{
//               backgroundColor: "var(--bg-box)",
//               color: "var(--text-main)",
//               borderRadius: 4,
//               boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//               px: 4,
//               py: 5,
//               mt: 2,
//               border: "1px solid var(--border-color)",
//               transition: "all 0.3s ease", // transizione per dark/light
//             }}
//           >
//             <TheoryNextPrevNavigation margin_bottom={3} margin_top={0} />
//             <Outlet />
//             <TheoryNextPrevNavigation />
//           </Container>
//         </Box>
//       </Box>
//     </GridTheoryBackground>
//   );
// }
