import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function GuidaCodice() {
  return (
    <>
      <TheoryTitle>Guida ai Componenti</TheoryTitle>

      {/* ===================== */}
      {/* 1. PARAGRAFO */}
      {/* ===================== */}
      <TheorySection title="1. TheoryParagraph">
        <TheoryParagraph>
          Il componente <strong>TheoryParagraph</strong> serve a scrivere testi
          descrittivi all'interno della pagina. Può contenere grassetto, corsivo
          e altre formattazioni inline.
        </TheoryParagraph>

        <TheoryBox title="Esempio">
          Questo è un paragrafo di esempio creato con{" "}
          <strong>TheoryParagraph</strong>.
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 2. LISTE */}
      {/* ===================== */}
      <TheorySection title="2. TheoryList">
        <TheoryParagraph>
          <strong>TheoryList</strong> permette di creare elenchi puntati.
          Passiamo un array di stringhe al prop <code>items</code>.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Primo elemento della lista",
            "Secondo elemento della lista",
            "Terzo elemento della lista",
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 3. BOX */}
      {/* ===================== */}
      <TheorySection title="3. TheoryBox">
        <TheoryParagraph>
          <strong>TheoryBox</strong> è utile per evidenziare concetti chiave o
          note importanti. Ha un titolo e un contenuto.
        </TheoryParagraph>

        <TheoryBox title="Esempio di Box">
          Qui dentro possiamo mettere spiegazioni importanti, regole pratiche o
          avvertenze.
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 4. TABELLE */}
      {/* ===================== */}
      <TheorySection title="4. TheoryTable">
        <TheoryParagraph>
          <strong>TheoryTable</strong> permette di creare tabelle. Si passa un
          array di oggetti con le proprietà <code>conto_dare</code>,{" "}
          <code>importo_dare</code>, <code>conto_avere</code>,{" "}
          <code>importo_avere</code>.
        </TheoryParagraph>

        <TheoryTable
          title="Esempio di Tabella"
          rows={[
            {
              conto_dare: "Spese di esempio",
              importo_dare: "100",
              conto_avere: "Cassa",
              importo_avere: "100",
            },
            {
              conto_dare: "Spese aggiuntive",
              importo_dare: "50",
              conto_avere: "Banca",
              importo_avere: "50",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 5. STRUTTURA DELLE PAGINE */}
      {/* ===================== */}
      <TheorySection title="5. Struttura generale di una pagina teorica">
        <TheoryParagraph>
          Le pagine teoriche sono organizzate in sezioni e sottosezioni. Ogni
          sezione può contenere:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Paragrafi di testo con TheoryParagraph",
            "Liste puntate con TheoryList",
            "Box informativi con TheoryBox",
            "Tabelle contabili con TheoryTable",
            "Titoli di sezione e sottosezione con TheorySection",
          ]}
        />

        <TheoryBox title="Suggerimento">
          Seguendo questa struttura, le pagine sono chiare, leggibili e coerenti
          con lo stile didattico.
        </TheoryBox>
      </TheorySection>
    </>
  );
}
