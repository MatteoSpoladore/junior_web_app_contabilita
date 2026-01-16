import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function MastriniTable({ mastrini }: any) {
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ width: "100%", overflowX: "auto" }}
    >
      <Table sx={{ width: "100%", tableLayout: "fixed" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
              Conto
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", width: "20%" }}>
              Totale Dare
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", width: "20%" }}>
              Totale Avere
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", width: "20%" }}>
              Saldo
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mastrini.map((m: any) => {
            const dare = Number(m.dare) || 0;
            const avere = Number(m.avere) || 0;
            const saldo = Number(m.saldo);

            return (
              <TableRow key={m.id} hover>
                <TableCell>{m.nome}</TableCell>
                <TableCell align="right">{dare.toFixed(2)} €</TableCell>
                <TableCell align="right">{avere.toFixed(2)} €</TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                    color: saldo >= 0 ? "green" : "red",
                  }}
                >
                  {saldo.toFixed(2)} €
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
