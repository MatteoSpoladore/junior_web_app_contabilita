import React from "react";
import {
  Box,
  Paper,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api";
import type { Operazione, RigaOperazione } from "../../types";

export default function ScrittureTable({
  rows,
  onEdit,
  onDeleteComplete,
}: {
  rows: Operazione[];
  onEdit: (op: Operazione) => void;
  onDeleteComplete: () => void;
}) {
  const deleteRow = async (id: number) => {
    if (!window.confirm("Eliminare l'intera operazione contabile?")) return;
    await api.delete(`/operazioni/${id}/`);
    onDeleteComplete();
  };

  return (
    <TableContainer component={Paper} elevation={3} sx={{ maxHeight: "60vh" }}>
      <Table stickyHeader size="small" aria-label="libro giornale">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold", bgcolor: "#f5f5f5", width: "3%" }}
            >
              Data
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", bgcolor: "#f5f5f5", width: "20%" }}
            >
              Descrizione
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", bgcolor: "#f5f5f5", width: "20%" }}
            >
              Conto
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", bgcolor: "#f5f5f5", width: "10%" }}
            >
              Dare (€)
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", bgcolor: "#f5f5f5", width: "10%" }}
            >
              Avere (€)
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", bgcolor: "#f5f5f5", width: "5%" }}
            >
              Azioni
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((op) => {
            const righeCount = op.righe?.length || 1;

            return (
              <React.Fragment key={op.id}>
                {op.righe?.map((riga: RigaOperazione, index: number) => (
                  <TableRow
                    key={`${op.id}-riga-${index}`}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderBottom:
                          index === righeCount - 1
                            ? "2px solid #e0e0e0"
                            : "1px solid rgba(224, 224, 224, 1)",
                      },
                    }}
                  >
                    {/* Celle Unite: Data e Descrizione (Mostrate SOLO alla prima riga dell'operazione) */}
                    {index === 0 && (
                      <>
                        <TableCell
                          rowSpan={righeCount}
                          sx={{
                            verticalAlign: "top",
                            borderRight: "1px solid #eeeeee",
                          }}
                        >
                          {new Date(op.data).toLocaleDateString("it-IT")}
                        </TableCell>
                        <TableCell
                          rowSpan={righeCount}
                          sx={{
                            verticalAlign: "top",
                            borderRight: "1px solid #eeeeee",
                          }}
                        >
                          <Typography variant="body2" fontWeight={500}>
                            {op.descrizione}
                          </Typography>
                        </TableCell>
                      </>
                    )}

                    {/* Cella Singola: Il nome del Conto (Indentato se è in Avere) */}
                    <TableCell
                      sx={{
                        pl: riga.sezione === "A" ? 2 : 2, // possibilità di cambiare padding left tra dare e avere
                        fontStyle: riga.sezione === "A" ? "normal" : "normal", // possibilità di cambiare font style tra dare e avere
                        color:
                          riga.sezione === "A"
                            ? "text.primary" // possibilità di cambiare text.prim/sec tra dare e avere
                            : "text.primary",
                      }}
                    >
                      {riga.conto_nome || "Conto non trovato"}
                    </TableCell>

                    {/* Colonna DARE */}
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: riga.sezione === "D" ? "bold" : "normal",
                      }}
                    >
                      {riga.sezione === "D"
                        ? Number(riga.importo).toFixed(2)
                        : ""}
                    </TableCell>

                    {/* Colonna AVERE */}
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: riga.sezione === "A" ? "bold" : "normal",
                      }}
                    >
                      {riga.sezione === "A"
                        ? Number(riga.importo).toFixed(2)
                        : ""}
                    </TableCell>

                    {/* Celle Unite: Azioni (Mostrate SOLO alla prima riga dell'operazione) */}
                    {index === 0 && (
                      <TableCell
                        rowSpan={righeCount}
                        align="center"
                        sx={{
                          verticalAlign: "middle",
                          borderLeft: "1px solid #eeeeee",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => onEdit(op)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => deleteRow(op.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}

          {/* Fallback se non ci sono scritture */}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                <Typography color="textSecondary">
                  Nessun movimento registrato in questo esercizio.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
