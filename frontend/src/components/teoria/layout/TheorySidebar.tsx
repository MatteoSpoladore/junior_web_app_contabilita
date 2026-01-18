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

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 60;
const HEADER_HEIGHT = 64;

const links = [
  { label: "Indice", to: "/teoria/indice" },
  { label: "Contabilità generale", to: "/teoria/generale" },
  { label: "Ratei e Risconti", to: "/teoria/ratei-e-risconti" },
  { label: "Leasing finanziario", to: "/teoria/leasing" },
  {
    label: "Immobilizzazioni avanzate",
    to: "/teoria/immobilizzazioni-avanzate",
  },
  {
    label: "Aumento di Capitale Sociale",
    to: "/teoria/aumento-capitale-sociale",
  },
];

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
        backgroundColor: "#f5f7fa",
        borderRight: "1px solid #e0e0e0",
        zIndex: 1200,
        overflowY: "auto",
      }}
    >
      {/* Toggle */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <List>
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
                  backgroundColor: "#e3f2fd",
                  fontWeight: 600,
                },
                justifyContent: collapsed ? "center" : "flex-start",
                whiteSpace: "nowrap",
                overflow: "hidden",
                alignItems: "center",
                px: 2,
              }}
            >
              {/* Solo testo quando aperto */}
              <Collapse
                orientation="horizontal"
                in={!collapsed}
                mountOnEnter
                unmountOnExit
              >
                <ListItemText
                  primary={link.label}
                  sx={{
                    flex: "0 0 auto", // non ridimensionabile
                  }}
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      // width: 140, // larghezza definitiva della sidebar aperta
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
              </Collapse>
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}
