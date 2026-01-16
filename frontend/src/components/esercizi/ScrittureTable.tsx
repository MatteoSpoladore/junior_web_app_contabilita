import { Box, Paper, Stack, IconButton, Fade } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api";

export default function ScrittureTable({
  rows,
  onEdit,
  onDeleteComplete,
}: any) {
  const deleteRow = async (id: number) => {
    if (!window.confirm("Eliminare questa registrazione?")) return;
    await api.delete(`/scritture/${id}/`);
    onDeleteComplete();
  };

  const columns = [
    { field: "data", headerName: "Data", width: 150, sortable: false },
    {
      field: "descrizione",
      headerName: "Descrizione",
      width: 250,
      sortable: false,
    },
    {
      field: "conto_dare_nome",
      headerName: "Conto Dare",
      width: 250,
      sortable: false,
    },
    {
      field: "conto_avere_nome",
      headerName: "Conto Avere",
      width: 250,
      sortable: false,
    },
    {
      field: "importo",
      headerName: "Importo",
      width: 140,
      align: "right",
      headerAlign: "right",
      sortable: false,
      renderCell: (p: any) => <strong>{Number(p.value).toFixed(2)} €</strong>,
    },
    {
      field: "actions",
      headerName: "Azioni",
      width: 100,
      sortable: false,
      renderCell: (p: any) => (
        <Box display="flex" justifyContent="center" width="100%">
          <Stack direction="row" spacing={1}>
            <IconButton
              color="primary"
              size="small"
              onClick={() => onEdit(p.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              onClick={() => deleteRow(p.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      ),
    },
  ];

  return (
    <Paper sx={{ height: "55vh", width: "100%" }} elevation={3}>
      {/* <Fade in key={rows.length} timeout={300}> */}
      <Box sx={{ height: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density="compact"
          disableRowSelectionOnClick
          sx={{ "& .MuiDataGrid-columnHeaders": { bgcolor: "#f5f5f5" } }}
        />
      </Box>
      {/* </Fade> */}
    </Paper>
  );
}
