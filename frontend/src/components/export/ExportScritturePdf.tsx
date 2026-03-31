import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getUsernameFromToken } from "../../utils/authUtils";

export default function ExportScritturePDF({ scritture, esercizio }: any) {
  const exportPDF = () => {
    const username = getUsernameFromToken();

    const safeUser = username.replace(/\s+/g, "_");
    const safeEsercizio = esercizio.nome.replace(/\s+/g, "_");

    // 📄 A4 VERTICALE
    const doc = new jsPDF("p", "mm", "a4");

    // Titolo
    doc.setFontSize(15);
    doc.text(`Libro Giornale - ${esercizio.nome}`, 14, 15);

    // Utente
    doc.setFontSize(10);
    doc.text(`Utente: ${username}`, 14, 20);

    // Costruiamo il body della tabella gestendo il rowSpan per le scritture composte
    const tableBody: any[] = [];

    scritture.forEach((op: any) => {
      const righeCount = op.righe?.length || 1;

      op.righe?.forEach((riga: any, index: number) => {
        const isDare = riga.sezione === "D";
        const isAvere = riga.sezione === "A";
        const rowData: any[] = [];

        // Inseriamo Data e Descrizione SOLO nella prima riga dell'operazione,
        // e diciamo ad autotable di unire le celle verticalmente (rowSpan)
        if (index === 0) {
          rowData.push({
            content: new Date(op.data).toLocaleDateString("it-IT"),
            rowSpan: righeCount,
            styles: { valign: "top" },
          });
          rowData.push({
            content: op.descrizione,
            rowSpan: righeCount,
            styles: { valign: "top" },
          });
        }

        // Colonna Conto (indentata e in corsivo se è in Avere)
        rowData.push({
          content: isAvere
            ? `      ${riga.conto_nome || "N/A"}`
            : riga.conto_nome || "N/A",
          styles: {
            fontStyle: isAvere ? "normal" : "normal",
            textColor: isAvere ? 0 : 0, // Grigio scuro per l'Avere
          },
        });

        // Colonna Dare
        rowData.push({
          content: isDare ? Number(riga.importo).toFixed(2) : "",
          styles: { fontStyle: isDare ? "normal" : "normal" },
        });

        // Colonna Avere
        rowData.push({
          content: isAvere ? Number(riga.importo).toFixed(2) : "",
          styles: { fontStyle: isAvere ? "normal" : "normal" },
        });

        tableBody.push(rowData);
      });
    });

    // Generazione Tabella
    autoTable(doc, {
      startY: 26,
      head: [["Data", "Descrizione", "Conto", "Dare (€)", "Avere (€)"]],
      body: tableBody,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: 0,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Data
        1: { cellWidth: 45 }, // Descrizione
        2: { cellWidth: 70 }, // Conto
        3: { cellWidth: 25, halign: "right" }, // Dare
        4: { cellWidth: 22, halign: "right" }, // Avere
      },
      margin: { left: 14, right: 14 },
    });

    doc.save(`libro_giornale_${safeEsercizio}_${safeUser}.pdf`);
  };

  return (
    <Button variant="outlined" onClick={exportPDF}>
      Stampa Libro Giornale
    </Button>
  );
}
