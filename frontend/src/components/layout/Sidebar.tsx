import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  CircularProgress,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// IMPORTAZIONE CORRETTA: IL BOTTONE
import AddEsercizioButton from "@/components/esercizi/AddEsercizioButton";
import EditDialogEsercizio from "@/components/layout/EditDialogEsercizio";
import DeleteDialogEsercizio from "@/components/layout/DeleteDialogEsercizio";

import api from "@/api";
import type { Esercizio } from "@/types";
import {
  DRAWER_WIDTH,
  DRAWER_COLLAPSED_WIDTH,
  LAYOUT_TRANSITION,
} from "./layout.constants";

export default function Sidebar({ open }: { open: boolean }) {
  const [esercizi, setEsercizi] = useState<Esercizio[]>([]);
  const [loading, setLoading] = useState(true);

  const [editTarget, setEditTarget] = useState<Esercizio | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Esercizio | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchEsercizi = async () => {
    try {
      const res = await api.get("/esercizi/");
      setEsercizi(res.data);
    } catch (err: any) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEsercizi();
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
          transition: `width ${LAYOUT_TRANSITION}`,
          overflowX: "hidden",
          boxSizing: "border-box",
          mt: "64px",
          height: "calc(100% - 64px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowX: "hidden",
        }}
      >
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/app")}
                selected={location.pathname === "/app"}
              >
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Home Dashboard" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider sx={{ my: 1 }} />

          {open && (
            <Typography
              variant="overline"
              sx={{ px: 3, color: "text.secondary" }}
            >
              I Miei Esercizi
            </Typography>
          )}

          {/* RICHIAMO CORRETTO AL BOTTONE */}
          {open && (
            <Box px={2} pb={1} pt={1}>
              <AddEsercizioButton refresh={fetchEsercizi} open={open} />
            </Box>
          )}
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
          <List>
            {loading ? (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress size={24} />
              </Box>
            ) : esercizi.length === 0 ? (
              open && (
                <Typography
                  variant="body2"
                  sx={{ px: 3, color: "text.secondary" }}
                >
                  Nessun esercizio.
                </Typography>
              )
            ) : (
              esercizi.map((es) => (
                <ListItem
                  key={es.id}
                  disablePadding
                  secondaryAction={
                    open ? (
                      <Box display="flex" alignItems="center">
                        <IconButton
                          size="small"
                          onClick={() => setEditTarget(es)}
                        >
                          <EditIcon fontSize="small" color="action" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => setDeleteTarget(es)}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Box>
                    ) : null
                  }
                >
                  <ListItemButton
                    onClick={() => navigate(`/app/esercizio/${es.id}`)}
                    selected={location.pathname === `/app/esercizio/${es.id}`}
                    sx={{
                      pr: open ? "88px" : 2,
                      "&.Mui-selected": {
                        bgcolor: "var(--info-accent)20",
                        borderRight: "4px solid var(--info-accent)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <AssignmentIcon
                        color={
                          location.pathname === `/app/esercizio/${es.id}`
                            ? "info"
                            : "inherit"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={es.nome}
                      primaryTypographyProps={{
                        noWrap: true,
                      }}
                      sx={{
                        maxWidth: open ? "90px" : "100%",
                        overflow: "hidden",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>

        <EditDialogEsercizio
          open={!!editTarget}
          esercizio={editTarget}
          eserciziUtente={esercizi}
          onClose={() => setEditTarget(null)}
          onSuccess={fetchEsercizi}
        />

        <DeleteDialogEsercizio
          open={!!deleteTarget}
          esercizio={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onSuccess={() => {
            if (location.pathname === `/app/esercizio/${deleteTarget?.id}`)
              navigate("/app");
            fetchEsercizi();
          }}
        />
      </Box>
    </Drawer>
  );
}
