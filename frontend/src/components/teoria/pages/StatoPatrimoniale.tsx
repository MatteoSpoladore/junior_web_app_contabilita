import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function StatoPatrimonialeTheory() {
  return (
    <>
      <TheoryTitle>
        Lo Stato Patrimoniale: struttura, attività e passività
      </TheoryTitle>

      {/* ===================== */}
      {/* 1. SIGNIFICATO */}
      {/* ===================== */}
      <TheorySection title="1. Significato dello Stato Patrimoniale">
        <TheoryParagraph>
          Lo Stato Patrimoniale rappresenta la situazione patrimoniale e
          finanziaria dell’azienda in un determinato momento, evidenziando ciò
          che l’azienda possiede e le fonti di finanziamento utilizzate.
        </TheoryParagraph>

        <TheoryBox title="Idea chiave">
          <strong>Attività = Passività + Patrimonio netto</strong>
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 2. STRUTTURA */}
      {/* ===================== */}
      <TheorySection title="2. Struttura dello Stato Patrimoniale">
        <TheoryParagraph>
          Lo Stato Patrimoniale è diviso in due sezioni contrapposte:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Attivo: impieghi di capitale (beni e diritti)",
            "Passivo: fonti di finanziamento (capitale proprio e di terzi)",
          ]}
        />

        <TheoryBox title="Schema generale">
          Attivo | Passivo <br />
          Impieghi | Fonti
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 3. ATTIVO */}
      {/* ===================== */}
      <TheorySection title="3. Attivo dello Stato Patrimoniale">
        <TheoryParagraph>
          L’Attivo comprende tutte le risorse economiche a disposizione
          dell’azienda, ordinate secondo il criterio della liquidità crescente.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Immobilizzazioni: beni destinati a permanere a lungo",
            "Attivo circolante: beni destinati al ciclo produttivo",
            "Ratei e risconti attivi",
          ]}
        />

        <TheoryTable
          title="Esempio di Attivo"
          rows={[
            {
              conto_dare: "Immobilizzazioni materiali",
              importo_dare: "120.000",
              conto_avere: "",
              importo_avere: "",
            },
            {
              conto_dare: "Rimanenze",
              importo_dare: "30.000",
              conto_avere: "",
              importo_avere: "",
            },
            {
              conto_dare: "Crediti verso clienti",
              importo_dare: "40.000",
              conto_avere: "",
              importo_avere: "",
            },
            {
              conto_dare: "Disponibilità liquide",
              importo_dare: "20.000",
              conto_avere: "",
              importo_avere: "",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 4. PASSIVO */}
      {/* ===================== */}
      <TheorySection title="4. Passivo dello Stato Patrimoniale">
        <TheoryParagraph>
          Il Passivo indica le fonti di finanziamento utilizzate dall’azienda,
          distinguendo tra capitale proprio e capitale di terzi.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Patrimonio netto: capitale proprio",
            "Fondi per rischi e oneri",
            "Debiti: capitale di terzi",
            "Ratei e risconti passivi",
          ]}
        />

        <TheoryTable
          title="Esempio di Passivo"
          rows={[
            {
              conto_dare: "",
              importo_dare: "",
              conto_avere: "Capitale sociale",
              importo_avere: "100.000",
            },
            {
              conto_dare: "",
              importo_dare: "",
              conto_avere: "Utile d’esercizio",
              importo_avere: "22.000",
            },
            {
              conto_dare: "",
              importo_dare: "",
              conto_avere: "Debiti verso banche",
              importo_avere: "60.000",
            },
            {
              conto_dare: "",
              importo_dare: "",
              conto_avere: "Debiti verso fornitori",
              importo_avere: "28.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 5. EQUILIBRIO */}
      {/* ===================== */}
      <TheorySection title="5. Equilibrio patrimoniale">
        <TheoryParagraph>
          Lo Stato Patrimoniale è sempre in equilibrio: il totale dell’Attivo
          deve coincidere con il totale del Passivo.
        </TheoryParagraph>

        <TheoryTable
          title="Verifica dell’equilibrio"
          rows={[
            {
              conto_dare: "Totale Attivo",
              importo_dare: "210.000",
              conto_avere: "Totale Passivo",
              importo_avere: "210.000",
            },
          ]}
        />

        <TheoryBox title="Idea chiave">
          Ogni impiego di capitale ha una corrispondente fonte di finanziamento.
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 6. SCHEMA RIASSUNTIVO */}
      {/* ===================== */}
      <TheorySection title="6. Schema riassuntivo">
        <TheoryList
          items={[
            "Attivo → ciò che l’azienda possiede",
            "Passivo → da dove provengono i capitali",
            "Patrimonio netto → ricchezza propria dell’azienda",
            "Debiti → obbligazioni verso terzi",
          ]}
        />
      </TheorySection>
    </>
  );
}
