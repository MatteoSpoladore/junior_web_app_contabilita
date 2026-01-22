import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { theoryRoutes } from "./TheoryRoutes";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

interface TheorySidebarProps {
  open: boolean;
}

export default function TheorySidebar({ open }: TheorySidebarProps) {
  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        top: HEADER_HEIGHT,
        left: 0,
        width: SIDEBAR_WIDTH,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        backgroundColor: "var(--bg-box)",
        borderRight: "1px solid var(--border-color)",
        overflowY: "auto",
        zIndex: 1200,

        /* 🎬 Animazione */
        transform: open ? "translateX(0)" : "translateX(-100%)",
        opacity: open ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.2s ease",

        /* UX */
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <List>
        {theoryRoutes.map((link) => (
          <ListItemButton
            key={link.path}
            component={NavLink}
            to={`/teoria/${link.path}`}
            sx={{
              "&.active": {
                backgroundColor: "var(--active-bg)",
                fontWeight: 600,
              },
              "&:hover": {
                backgroundColor: "var(--hover-bg)",
              },
              color: "var(--text-main)",
            }}
          >
            <ListItemText
              primary={link.label}
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
