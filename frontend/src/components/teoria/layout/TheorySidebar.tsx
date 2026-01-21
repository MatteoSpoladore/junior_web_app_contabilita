import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { theoryRoutes } from "./TheoryRoutes";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 60;
const HEADER_HEIGHT = 64;

// const links = [
//   { label: "Indice", to: "/teoria/indice" },
//   { label: "Guida ai contenuti", to: "/teoria/guida-ai-contenuti" },
//   { label: "Contabilità generale", to: "/teoria/generale" },
//   { label: "Ratei e Risconti", to: "/teoria/ratei-e-risconti" },
//   { label: "Leasing finanziario", to: "/teoria/leasing" },
//   {
//     label: "Immobilizzazioni avanzate",
//     to: "/teoria/immobilizzazioni-avanzate",
//   },
//   {
//     label: "Aumento di Capitale Sociale",
//     to: "/teoria/aumento-capitale-sociale",
//   },

//   {
//     label: "Guida Codice",
//     to: "/teoria/guida-codice",
//   },
// ];

export default function TheorySidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const width = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <Box
      sx={{
        position: "fixed",
        top: HEADER_HEIGHT,
        left: 0,
        width,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        transition: "width 0.3s",
        backgroundColor: "var(--bg-box)",
        borderRight: "1px solid var(--border-color)",
        zIndex: 1200,
        overflowY: "auto",
        color: "var(--text-main)",
      }}
    >
      {/* Toggle */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton
          size="small"
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: "var(--text-main)" }}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <List>
        {theoryRoutes.map((link) => (
          <Tooltip
            key={link.path}
            title={collapsed ? link.label : ""}
            placement="right"
          >
            <ListItemButton
              component={NavLink}
              to={`/teoria/${link.path}`}
              sx={{
                "&.active": {
                  backgroundColor: "var(--active-bg)",
                  fontWeight: 600,
                },
                "&:hover": { backgroundColor: "var(--hover-bg)" },
                justifyContent: collapsed ? "center" : "flex-start",
                px: 2,
                color: "var(--text-main)",
              }}
            >
              <Collapse orientation="horizontal" in={!collapsed}>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </Collapse>
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
      {/* <List>
        {links.map((link) => (
          <Tooltip
            key={link.to}
            title={collapsed ? link.label : ""}
            placement="right"
          >
            <ListItemButton
              component={NavLink}
              to={link.to}
              sx={{
                "&.active": {
                  backgroundColor: "var(--active-bg)",
                  fontWeight: 600,
                },
                "&:hover": {
                  backgroundColor: "var(--hover-bg)",
                },
                justifyContent: collapsed ? "center" : "flex-start",
                px: 2,
                color: "var(--text-main)",
              }}
            >
              <Collapse orientation="horizontal" in={!collapsed}>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    noWrap: true,
                  }}
                />
              </Collapse>
            </ListItemButton>
          </Tooltip>
        ))}
      </List> */}
    </Box>
  );
}
