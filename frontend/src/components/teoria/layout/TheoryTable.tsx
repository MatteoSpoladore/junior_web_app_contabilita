import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

type Row = {
  conto_dare?: string;
  importo_dare?: string;
  conto_avere?: string;
  importo_avere?: string;
};

export default function TheoryTable({
  title,
  rows,
}: {
  title?: string;
  rows: Row[];
}) {
  return (
    <Card elevation={1} sx={{ mt: 2 }}>
      <CardContent>
        {title && (
          <Typography variant="subtitle1" gutterBottom>
            {title}
          </Typography>
        )}

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Conto Dare</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Importo Dare
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Conto Avere</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Importo Avere
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.conto_dare || "—"}</TableCell>
                <TableCell align="right">{r.importo_dare || "—"}</TableCell>
                <TableCell>{r.conto_avere || "—"}</TableCell>
                <TableCell align="right">{r.importo_avere || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
