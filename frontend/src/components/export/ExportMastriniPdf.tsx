import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getUsernameFromToken } from "../../utils/authUtils";

const SEZIONI = [
  { titolo: "ATTIVO", from: 10, to: 49 },
  { titolo: "PASSIVO", from: 50, to: 79 },
  { titolo: "PATRIMONIO NETTO", from: 80, to: 89 },
  { titolo: "COSTI", from: 90, to: 94 },
  { titolo: "RICAVI", from: 95, to: 99 },
];

function groupMastriniBySezione(mastrini: any[]) {
  const groups: Record<string, any[]> = {};

  SEZIONI.forEach((s) => (groups[s.titolo] = []));

  mastrini.forEach((m) => {
    const mainCode = parseInt(m.codice.split(".")[0], 10);

    const sezione = SEZIONI.find((s) => mainCode >= s.from && mainCode <= s.to);

    if (sezione) {
      groups[sezione.titolo].push(m);
    }
  });

  return groups;
}

export default function ExportMastriniPDF({ mastrini, esercizio }: any) {
  const exportPDF = () => {
    const username = getUsernameFromToken();
    const safeUser = username.replace(/\s+/g, "_");
    const safeEsercizio = esercizio.nome.replace(/\s+/g, "_");

    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(16);
    doc.text(`Mastrini - ${esercizio.nome}`, 14, 15);

    doc.setFontSize(10);
    doc.text(`Utente: ${username}`, 14, 20);

    let currentY = 28;

    const mastriniUsati = mastrini.filter((m: any) => {
      const dare = Number(m.dare) || 0;
      const avere = Number(m.avere) || 0;
      return dare !== 0 || avere !== 0;
    });

    const grouped = groupMastriniBySezione(mastriniUsati);

    Object.entries(grouped).forEach(([titolo, rows]) => {
      if (rows.length === 0) return;

      // Titolo sezione
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(titolo, 14, currentY);
      currentY += 5;

      autoTable(doc, {
        startY: currentY,
        head: [["Conto", "Totale Dare", "Totale Avere", "Saldo"]],
        body: rows.map((m: any) => {
          const dare = Number(m.dare) || 0;
          const avere = Number(m.avere) || 0;
          const saldo = dare - avere;

          return [
            `${m.codice} - ${m.nome}`,
            dare.toFixed(2),
            avere.toFixed(2),
            saldo.toFixed(2),
          ];
        }),
        columnStyles: {
          1: { halign: "right" },
          2: { halign: "right" },
          3: { halign: "right" },
        },
        headStyles: {
          fillColor: [230, 230, 230],
          fontStyle: "bold",
        },
        styles: {
          fontSize: 9,
        },
        didDrawPage: (data) => {
          currentY = data.cursor.y + 10;
        },
      });
    });

    doc.save(`mastrini_${safeEsercizio}_${safeUser}.pdf`);
  };

  // versione vecchia
  // const exportPDF = () => {
  //   const username = getUsernameFromToken();

  //   const safeUser = username.replace(/\s+/g, "_");
  //   const safeEsercizio = esercizio.nome.replace(/\s+/g, "_");

  //   const doc = new jsPDF("p", "mm", "a4");

  //   doc.setFontSize(16);
  //   doc.text(`Mastrini - ${esercizio.nome}`, 14, 15);

  //   doc.setFontSize(10);
  //   doc.text(`Utente: ${username}`, 14, 20);

  //   // tabella versione non suddivisa
  //   autoTable(doc, {
  //     startY: 26,
  //     head: [["Conto", "Totale Dare", "Totale Avere", "Saldo"]],
  //     body: mastrini.map((m: any) => {
  //       const dare = Number(m.dare) || 0;
  //       const avere = Number(m.avere) || 0;
  //       const saldo = dare - avere;

  //       return [m.nome, dare.toFixed(2), avere.toFixed(2), saldo.toFixed(2)];
  //     }),
  //     columnStyles: {
  //       1: { halign: "right" },
  //       2: { halign: "right" },
  //       3: { halign: "right" },
  //     },
  //     headStyles: {
  //       fillColor: [230, 230, 230],
  //       textColor: 0,
  //       fontStyle: "bold",
  //     },
  //   });

  //   doc.save(`mastrini_${safeEsercizio}_${safeUser}.pdf`);
  // };

  return (
    <Button variant="outlined" onClick={exportPDF}>
      Esporta Mastrini
    </Button>
  );
}
