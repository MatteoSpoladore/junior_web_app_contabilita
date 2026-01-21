import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function GuidaContenuti() {
  return (
    <>
      <TheoryTitle>Guida alla Struttura delle Pagine Teoriche</TheoryTitle>

      {/* ===================== */}
      {/* 1. Argomento principale */}
      {/* ===================== */}
      <TheorySection title="1. Argomento principale">
        <TheoryParagraph>
          Ogni pagina teorica tratta un <strong>argomento specifico</strong>. Ad
          esempio, nella pagina “Ratei e Risconti”, l’argomento principale è
          appunto Ratei e Risconti. L’argomento viene introdotto con paragrafi
          di spiegazione, che aiutano a capire il concetto generale.
        </TheoryParagraph>
      </TheorySection>

      {/* ===================== */}
      {/* 2. Sezioni e sottosezioni */}
      {/* ===================== */}
      <TheorySection title="2. Sezioni e sottosezioni">
        <TheoryParagraph>
          Le pagine sono organizzate in <strong>sezioni</strong> e, se
          necessario, <strong>sottosezioni</strong> per spiegare dettagli o
          esempi pratici.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Sezione principale: introduce la regola o il concetto",
            "Sottosezione: approfondisce aspetti particolari o mostra esempi concreti",
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 3. Box informativi */}
      {/* ===================== */}
      <TheorySection title="3. Box informativi">
        <TheoryParagraph>
          I box evidenziati contengono regole pratiche, suggerimenti o concetti
          chiave da ricordare.
        </TheoryParagraph>

        <TheoryBox title="Esempio di Box">
          <strong>Regola pratica:</strong>
          <br />
          - Anticipato → Risconto
          <br />
          - Posticipato → Rateo
          <br />
          - Paga/incassa l’azienda → Attivo
          <br />- Paga/incassa il terzo → Passivo
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 4. Tabelle contabili */}
      {/* ===================== */}
      <TheorySection title="4. Tabelle contabili">
        <TheoryParagraph>
          Le tabelle servono a mostrare scritture contabili di esempio,
          facilitando la comprensione pratica delle regole.
        </TheoryParagraph>

        <TheoryTable
          title="Esempio di tabella contabile"
          rows={[
            {
              conto_dare: "Spese di sorveglianza",
              importo_dare: "1.200",
              conto_avere: "Cassa",
              importo_avere: "1.200",
            },
            {
              conto_dare: "Risconti attivi",
              importo_dare: "800",
              conto_avere: "Spese di sorveglianza",
              importo_avere: "800",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 5. Liste e punti chiave */}
      {/* ===================== */}
      <TheorySection title="5. Liste e punti chiave">
        <TheoryParagraph>
          Le liste puntate riassumono passaggi operativi, criteri da seguire o
          punti principali.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Capire chi paga o incassa (azienda o terzi)",
            "Capire se il pagamento/incasso è anticipato o posticipato",
            "Individuare se si tratta di rateo o risconto, attivo o passivo",
            "Capire la natura del conto di competenza (costo o ricavo)",
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 6. Suggerimenti pratici */}
      {/* ===================== */}
      <TheorySection title="6. Suggerimenti pratici">
        <TheoryParagraph>
          Alla fine di ogni sezione o pagina ci sono consigli pratici per
          evitare errori.
        </TheoryParagraph>

        <TheoryBox title="Suggerimento">
          - Rateo/Risconto attivo → conto in AVERE
          <br />- Rateo/Risconto passivo → conto in DARE
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 7. Sintesi */}
      {/* ===================== */}
      <TheorySection title="7. Sintesi">
        <TheoryParagraph>
          Le pagine teoriche sono strutturate per facilitare lo studio:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Introduzione con paragrafi esplicativi",
            "Sezioni e sottosezioni per approfondimenti",
            "Box per regole chiave e concetti importanti",
            "Tabelle per esempi contabili",
            "Liste per riassumere procedure o criteri",
            "Suggerimenti pratici per non sbagliare",
          ]}
        />
      </TheorySection>
    </>
  );
}
