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
    <Card
      elevation={0}
      sx={{
        mt: 2,
        backgroundColor: "var(--bg-box)",
        color: "var(--text-main)",
        border: "1px solid var(--border-color)",
        borderRadius: 2,
      }}
    >
      <CardContent>
        {title && (
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        )}

        <Table
          size="small"
          sx={{
            "& th, & td": {
              color: "var(--text-main)",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "var(--table-head-bg)" }}>
              <TableCell sx={{ fontWeight: 600 }}>Conto Dare</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Conto Avere</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Importo Dare
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Importo Avere
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "var(--table-row-alt)",
                  },
                }}
              >
                <TableCell>{r.conto_dare || "—"}</TableCell>
                <TableCell>{r.conto_avere || "—"}</TableCell>
                <TableCell align="right">{r.importo_dare || "—"}</TableCell>
                <TableCell align="right">{r.importo_avere || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
