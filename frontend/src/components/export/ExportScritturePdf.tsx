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
    doc.text(`Scritture contabili - ${esercizio.nome}`, 14, 15);

    // Utente
    doc.setFontSize(10);
    doc.text(`Utente: ${username}`, 14, 20);

    autoTable(doc, {
      startY: 26,
      head: [
        ["Data", "Descrizione", "Conto Dare", "Conto Avere", "Importo (€)"],
      ],
      body: scritture.map((s: any) => [
        s.data,
        s.descrizione,
        s.conto_dare_nome,
        s.conto_avere_nome,
        Number(s.importo).toFixed(2),
      ]),
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: 0,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Data
        1: { cellWidth: 55 }, // Descrizione
        2: { cellWidth: 40 }, // Dare
        3: { cellWidth: 40 }, // Avere
        4: { cellWidth: 25, halign: "right" }, // Importo
      },
      margin: { left: 14, right: 14 },
    });

    doc.save(`scritture_${safeEsercizio}_${safeUser}.pdf`);
  };

  return (
    <Button variant="outlined" onClick={exportPDF}>
      Esporta Scritture
    </Button>
  );
}
