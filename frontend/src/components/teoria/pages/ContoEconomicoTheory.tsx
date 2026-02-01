import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function ContoEconomicoTheory() {
  return (
    <>
      <TheoryTitle>Il Conto Economico: struttura, ricavi e costi</TheoryTitle>

      {/* ===================== */}
      {/* 1. STRUTTURA */}
      {/* ===================== */}
      <TheorySection title="1. Struttura del Conto Economico">
        <TheoryParagraph>
          Il Conto Economico rappresenta la situazione economica di un’azienda
          in un determinato periodo, evidenziando i ricavi e i costi.
        </TheoryParagraph>

        <TheoryBox title="Idea chiave">
          Il risultato economico è dato da: <br />
          <strong>Ricavi totali – Costi totali = Utile o Perdita</strong>
        </TheoryBox>

        <TheoryList
          items={[
            "Ricavi: entrate derivanti dall’attività caratteristica",
            "Costi: uscite per beni, servizi o oneri sostenuti",
            "Utile (o perdita): differenza tra ricavi e costi",
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 2. TIPI DI RICAVI */}
      {/* ===================== */}
      <TheorySection title="2. Tipi di ricavi">
        <TheoryList
          items={[
            "Ricavi caratteristici: legati all’attività principale (vendite)",
            "Proventi finanziari: interessi attivi, dividendi",
            "Altri ricavi e proventi: es. plusvalenze da cessione di beni",
          ]}
        />

        <TheoryBox title="Esempio">
          Un’azienda vende prodotti per 100.000 €, riceve interessi bancari per
          1.000 € e realizza una plusvalenza di 2.000 € su un macchinario.
        </TheoryBox>

        <TheoryTable
          title="Riepilogo ricavi"
          rows={[
            {
              conto_dare: "Banca",
              importo_dare: "103.000",
              conto_avere: "Ricavi",
              importo_avere: "100.000",
            },
            {
              conto_dare: "Banca",
              importo_dare: "1.000",
              conto_avere: "Proventi finanziari",
              importo_avere: "1.000",
            },
            {
              conto_dare: "Banca",
              importo_dare: "2.000",
              conto_avere: "Plusvalenze",
              importo_avere: "2.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 3. TIPI DI COSTI */}
      {/* ===================== */}
      <TheorySection title="3. Tipi di costi">
        <TheoryList
          items={[
            "Costi operativi: materie prime, personale, servizi",
            "Oneri finanziari: interessi passivi su prestiti",
            "Altri costi: minusvalenze, tasse e imposte",
          ]}
        />

        <TheoryBox title="Esempio">
          L’azienda sostiene 50.000 € di costi per materie prime, 30.000 € per
          salari e 1.000 € di interessi passivi.
        </TheoryBox>

        <TheoryTable
          title="Riepilogo costi"
          rows={[
            {
              conto_dare: "Costi materie prime",
              importo_dare: "50.000",
              conto_avere: "Banca",
              importo_avere: "50.000",
            },
            {
              conto_dare: "Costi del personale",
              importo_dare: "30.000",
              conto_avere: "Banca",
              importo_avere: "30.000",
            },
            {
              conto_dare: "Oneri finanziari",
              importo_dare: "1.000",
              conto_avere: "Banca",
              importo_avere: "1.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 4. CALCOLO DELL'UTILE */}
      {/* ===================== */}
      <TheorySection title="4. Calcolo dell’utile o della perdita">
        <TheoryParagraph>
          Il risultato economico si ottiene confrontando tutti i ricavi con
          tutti i costi.
        </TheoryParagraph>

        <TheoryTable
          title="Esempio completo"
          rows={[
            {
              conto_dare: "Totale ricavi",
              importo_dare: "103.000",
              conto_avere: "Totale costi",
              importo_avere: "81.000",
            },
            {
              conto_dare: "Utile d’esercizio",
              importo_dare: "22.000",
              conto_avere: "",
              importo_avere: "",
            },
          ]}
        />

        <TheoryBox title="Idea chiave">
          Utile d’esercizio = 103.000 − 81.000 = 22.000 €
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 5. SCHEMA RIASSUNTIVO */}
      {/* ===================== */}
      <TheorySection title="5. Schema riassuntivo">
        <TheoryList
          items={[
            "Ricavi → aumento del patrimonio netto",
            "Costi → diminuzione del patrimonio netto",
            "Utile → incremento del patrimonio netto",
            "Perdita → decremento del patrimonio netto",
          ]}
        />
      </TheorySection>
    </>
  );
}
