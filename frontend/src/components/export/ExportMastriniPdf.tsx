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

  // Inizializza i gruppi nell'ordine corretto
  SEZIONI.forEach((s) => (groups[s.titolo] = []));
  groups["ALTRO (Fuori classificazione)"] = []; // Fallback di sicurezza

  mastrini.forEach((m) => {
    // Rendiamo la lettura del codice a prova di bomba
    const codiceStr = m.codice ? String(m.codice).trim() : "";
    const parts = codiceStr.split(".");
    const mainCode = parseInt(parts[0], 10);

    // Se per qualche motivo il codice manca o non è un numero (es. il prof ha creato un conto "Cassa" senza assegnare "10.10")
    if (isNaN(mainCode)) {
      groups["ALTRO (Fuori classificazione)"].push(m);
    } else {
      const sezione = SEZIONI.find(
        (s) => mainCode >= s.from && mainCode <= s.to,
      );
      if (sezione) {
        groups[sezione.titolo].push(m);
      } else {
        groups["ALTRO (Fuori classificazione)"].push(m);
      }
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
    doc.text(`Situazione Conti - ${esercizio.nome}`, 14, 15);

    doc.setFontSize(10);
    doc.text(`Utente: ${username}`, 14, 20);

    let currentY = 28;

    // Filtriamo solo i mastrini movimentati (che hanno Dare o Avere maggiore di zero)
    const mastriniUsati = mastrini.filter((m: any) => {
      const dare = Number(m.dare) || 0;
      const avere = Number(m.avere) || 0;
      return dare !== 0 || avere !== 0;
    });

    const grouped = groupMastriniBySezione(mastriniUsati);

    Object.entries(grouped).forEach(([titolo, rows]) => {
      if (rows.length === 0) return; // Salta le sezioni vuote

      // Se siamo vicini alla fine del foglio (A4 è lungo 297mm), andiamo a pagina nuova
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }

      // Stampa il Titolo della Sezione (es. "ATTIVO")
      doc.setFontSize(11);
      doc.setFont(undefined, "bold");
      doc.setTextColor(50, 50, 50);
      doc.text(titolo, 14, currentY);
      currentY += 4;

      // Generazione della Tabella con 5 Colonne
      autoTable(doc, {
        startY: currentY,
        head: [
          [
            "Codice e Conto",
            "Totale Dare",
            "Totale Avere",
            "Saldo Dare",
            "Saldo Avere",
          ],
        ],
        body: rows.map((m: any) => {
          const dare = Number(m.dare) || 0;
          const avere = Number(m.avere) || 0;
          const saldo = dare - avere;

          let saldoDare = "";
          let saldoAvere = "";

          // Posizioniamo il saldo nella colonna corretta
          if (saldo > 0) {
            saldoDare = saldo.toFixed(2);
          } else if (saldo < 0) {
            saldoAvere = Math.abs(saldo).toFixed(2);
          } else {
            // Conto spento (Dare = Avere)
            saldoDare = "0.00";
            saldoAvere = "0.00";
          }

          // Pulizia visiva se manca il codice
          const nomeConto = m.codice ? `${m.codice} - ${m.nome}` : m.nome;

          return [
            nomeConto,
            dare.toFixed(2),
            avere.toFixed(2),
            saldoDare,
            saldoAvere,
          ];
        }),
        columnStyles: {
          0: { cellWidth: 70 }, // Nome Conto
          1: { halign: "right", cellWidth: 28 }, // Tot Dare
          2: { halign: "right", cellWidth: 28 }, // Tot Avere
          3: { halign: "right", cellWidth: 28 }, // Saldo Dare
          4: { halign: "right", cellWidth: 28 }, // Saldo Avere
        },
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: 0,
          fontStyle: "bold",
          halign: "center", // Centriamo i titoli delle colonne per estetica
        },
        styles: {
          fontSize: 8.5,
          lineColor: [200, 200, 200],
          lineWidth: 0.1,
          cellPadding: 2,
        },
        margin: { left: 14, right: 14 },
      });

      // Aggiorniamo dinamicamente la Y prendendo il punto finale della tabella appena stampata
      currentY = (doc as any).lastAutoTable.finalY + 12;
    });

    doc.save(`situazione_conti_${safeEsercizio}_${safeUser}.pdf`);
  };

  return (
    <Button variant="outlined" onClick={exportPDF}>
      Stampa Situazione Conti
    </Button>
  );
}
