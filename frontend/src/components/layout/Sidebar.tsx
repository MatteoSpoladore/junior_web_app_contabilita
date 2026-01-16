import { useState } from "react";
import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Stack,
  Typography,
  Divider,
  Tooltip,
  Collapse,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddEsercizioButton from "../esercizi/AddEsercizioButton";
import EditEsercizioDialog from "./EditDialogEsercizio";
import DeleteEsercizioDialog from "./DeleteDialogEsercizio";

import api from "../../api";
import { DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH } from "./layout.constants";

/* =======================
    TIPI
  ======================= */
interface Esercizio {
  id: number;
  nome: string;
}

interface SidebarProps {
  open: boolean;
  esercizi: Esercizio[];
  esercizioSelezionato: Esercizio | null;
  setEsercizioSelezionato: (e: Esercizio | null) => void;
  refreshEsercizi: () => void;
}

/* =======================
    COMPONENT
  ======================= */
export default function Sidebar({
  open,
  esercizi,
  esercizioSelezionato,
  setEsercizioSelezionato,
  refreshEsercizi,
}: SidebarProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEx, setSelectedEx] = useState<Esercizio | null>(null);

  /* =======================
      HANDLERS
    ======================= */
  const openEditDialog = (ex: Esercizio) => {
    setSelectedEx(ex);
    setEditOpen(true);
  };

  const openDeleteDialog = (ex: Esercizio) => {
    setSelectedEx(ex);
    setDeleteOpen(true);
  };

  const handleEditSave = async (nome: string) => {
    if (!selectedEx) return;

    await api.patch(`/esercizi/${selectedEx.id}/`, { nome });
    setEditOpen(false);
    refreshEsercizi();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEx) return;

    await api.delete(`/esercizi/${selectedEx.id}/`);
    setDeleteOpen(false);
    refreshEsercizi();

    if (esercizioSelezionato?.id === selectedEx.id) {
      setEsercizioSelezionato(null);
    }
  };

  /* =======================
      RENDER
    ======================= */
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
          backgroundColor: "background.paper",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          transition: "width 0.28s",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />

      {/* HEADER */}
      <Box p={2} textAlign="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Collapse in={open} orientation="horizontal">
            <Typography variant="h6" fontWeight={700} whiteSpace="nowrap">
              I tuoi esercizi
            </Typography>
          </Collapse>
        </Box>

        <Box
          mt={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddEsercizioButton refresh={refreshEsercizi} open={open} />
        </Box>
      </Box>

      <Divider />

      {/* LISTA */}
      <List>
        {[...esercizi]
          .sort((a, b) => a.id - b.id)
          .map((ex) => (
            <ListItem key={ex.id} disablePadding>
              <Tooltip
                title={!open ? ex.nome : ""}
                placement="right"
                arrow
                disableHoverListener={open}
              >
                <ListItemButton
                  selected={esercizioSelezionato?.id === ex.id}
                  onClick={() => setEsercizioSelezionato(ex)}
                  sx={{
                    px: open ? 2 : 2,
                    justifyContent: "flex-start",

                    "&.Mui-selected": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.25),
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.35),
                    },
                  }}
                >
                  <FolderIcon
                    sx={{
                      minWidth: 0,
                      mr: 1.5,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />

                  <Collapse orientation="horizontal" in={open}>
                    <ListItemText
                      primary={ex.nome}
                      primaryTypographyProps={{
                        noWrap: true,
                        sx: {
                          maxWidth: 120,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
                  </Collapse>

                  {open && (
                    <Stack direction="row" ml="auto" spacing={0.5}>
                      <Tooltip title="Modifica">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditDialog(ex);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Elimina">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteDialog(ex);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
      </List>

      {/* DIALOGS */}
      <EditEsercizioDialog
        open={editOpen}
        eserciziUtente={esercizi}
        esercizio={selectedEx}
        onClose={() => setEditOpen(false)}
        onSave={handleEditSave}
      />

      <DeleteEsercizioDialog
        open={deleteOpen}
        esercizio={selectedEx}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Drawer>
  );
}

// vecchia
// import {
//   Drawer,
//   Toolbar,
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   IconButton,
//   Stack,
//   Typography,
//   Divider,
//   Tooltip,
//   Collapse,
// } from "@mui/material";
// import { alpha } from "@mui/material/styles";
// import AddEsercizioButton from "../esercizi/AddEsercizioButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FolderIcon from "@mui/icons-material/Folder";
// import api from "../../api";

// import { DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH } from "./layout.constants";

// export default function Sidebar({
//   open,
//   esercizi,
//   setEsercizioSelezionato,
//   esercizioSelezionato,
//   refreshEsercizi,
// }: any) {
//   const editEsercizio = async (ex: any) => {
//     const nuovoNome = prompt("Modifica nome:", ex.nome);
//     if (!nuovoNome) return;
//     await api.patch(`/esercizi/${ex.id}/`, { nome: nuovoNome });
//     refreshEsercizi();
//   };

//   const deleteEsercizio = async (id: number) => {
//     if (!window.confirm("Confermi l'eliminazione?")) return;
//     await api.delete(`/esercizi/${id}/`);
//     refreshEsercizi();
//     if (esercizioSelezionato?.id === id) setEsercizioSelezionato(null);
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: open ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: open ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH,
//           backgroundColor: "background.paper",
//           borderRight: "1px solid rgba(0,0,0,0.08)",
//           transition: "width 0.28s",
//           overflowX: "hidden",
//         },
//       }}
//     >
//       <Toolbar />

//       {/* HEADER SIDEBAR */}
//       <Box p={2} textAlign={open ? "left" : "center"}>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: 700, opacity: open ? 1 : 0, transition: "0.3s" }}
//           textAlign="center"
//         >
//           Esercizi
//         </Typography>

//         <Box mt={1} display="flex" justifyContent={open ? "center" : "center"}>
//           <AddEsercizioButton refresh={refreshEsercizi} open={open} />
//         </Box>
//       </Box>

//       <Divider />

//       {/* LISTA ESERCIZI */}
//       <List>
//         {esercizi.map((ex: any) => (
//           <ListItem key={ex.id} disablePadding>
//             <Tooltip
//               title={!open ? ex.nome : ""}
//               placement="right"
//               arrow
//               disableHoverListener={open}
//             >
//               <ListItemButton
//                 selected={esercizioSelezionato?.id === ex.id}
//                 onClick={() => setEsercizioSelezionato(ex)}
//                 sx={{
//                   px: open ? 2 : 1.5,
//                   justifyContent: open ? "flex-start" : "center",

//                   "&.Mui-selected": {
//                     backgroundColor: (theme) =>
//                       alpha(theme.palette.primary.main, 0.25),
//                   },

//                   "&.Mui-selected:hover": {
//                     backgroundColor: (theme) =>
//                       alpha(theme.palette.primary.main, 0.35),
//                   },
//                 }}
//               >
//                 <FolderIcon sx={{ mr: open ? 1.5 : 0 }} />

//                 {/* Nome visibile solo da aperto */}
//                 <Collapse orientation="horizontal" in={open}>
//                   <ListItemText
//                     primary={ex.nome}
//                     primaryTypographyProps={{
//                       noWrap: true,
//                       sx: {
//                         maxWidth: 100, // regola in base alla tua sidebar
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       },
//                     }}
//                   />
//                 </Collapse>

//                 {open && (
//                   <Stack direction="row" ml="auto" spacing={0.5}>
//                     <Tooltip title="Modifica">
//                       <IconButton
//                         size="small"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           editEsercizio(ex);
//                         }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Elimina">
//                       <IconButton
//                         size="small"
//                         color="error"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteEsercizio(ex.id);
//                         }}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   </Stack>
//                 )}
//               </ListItemButton>
//             </Tooltip>
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// }
