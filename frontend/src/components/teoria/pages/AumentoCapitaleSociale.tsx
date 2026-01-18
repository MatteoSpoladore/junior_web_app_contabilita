import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function AumentoCapitaleSocialeTheory() {
  return (
    <>
      <TheoryTitle>Aumento di Capitale Sociale</TheoryTitle>

      {/* ===================== */}
      {/* 1. INQUADRAMENTO */}
      {/* ===================== */}
      <TheorySection title="1. Inquadramento generale">
        <TheoryParagraph>
          L’aumento di capitale sociale è un’operazione sul patrimonio netto che
          comporta l’incremento del capitale nominale della società. Può
          avvenire secondo due modalità fondamentali:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Aumento di capitale gratuito",
            "Aumento di capitale a pagamento",
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 2. AUMENTO GRATUITO */}
      {/* ===================== */}
      <TheorySection title="2. Aumento di capitale gratuito">
        <TheoryParagraph>
          L’aumento gratuito di capitale sociale avviene senza nuovi
          conferimenti da parte dei soci. L’incremento del capitale è effettuato
          mediante l’utilizzo di riserve già esistenti nel patrimonio netto.
        </TheoryParagraph>

        <TheoryBox title="Caratteristiche principali">
          <TheoryList
            items={[
              "Non comporta nuovi apporti di liquidità.",
              "Utilizza riserve disponibili (es. riserva straordinaria).",
              "Aumenta il capitale sociale e riduce le riserve.",
              "È un’operazione puramente contabile.",
            ]}
          />
        </TheoryBox>

        <TheoryTable
          title="Scrittura contabile"
          rows={[
            {
              conto_dare: "Riserva straordinaria",
              importo_dare: "50.000",
              conto_avere: "Capitale sociale",
              importo_avere: "50.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 3. AUMENTO A PAGAMENTO */}
      {/* ===================== */}
      <TheorySection title="3. Aumento di capitale a pagamento">
        <TheoryParagraph>
          L’aumento di capitale a pagamento avviene mediante nuovi conferimenti
          effettuati dai soci o da terzi, con emissione di nuove azioni o quote.
        </TheoryParagraph>

        <TheoryBox title="Caratteristiche principali">
          <TheoryList
            items={[
              "Comporta l’ingresso di nuove risorse finanziarie.",
              "Può avvenire alla pari o sopra la pari.",
              "Può essere sottoscritto da soci attuali o nuovi soci.",
            ]}
          />
        </TheoryBox>

        <TheoryParagraph>
          In funzione del prezzo di emissione delle nuove azioni, l’aumento di
          capitale a pagamento può essere:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Alla pari",
            "Sopra la pari",
            "Sotto la pari (non consentito nel diritto societario italiano)",
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 4. ALLA PARI */}
      {/* ===================== */}
      <TheorySection title="4. Aumento di capitale alla pari">
        <TheoryParagraph>
          L’aumento alla pari avviene quando il prezzo di emissione delle nuove
          azioni coincide con il valore nominale.
        </TheoryParagraph>

        <TheoryBox title="Effetti contabili">
          <TheoryList
            items={[
              "Il capitale sociale aumenta per l’intero importo sottoscritto.",
              "Non si genera alcuna riserva da sovrapprezzo.",
            ]}
          />
        </TheoryBox>

        <TheoryTable
          title="Scrittura contabile"
          rows={[
            {
              conto_dare: "Banca c/c",
              importo_dare: "100.000",
              conto_avere: "Capitale sociale",
              importo_avere: "100.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 5. SOPRA LA PARI */}
      {/* ===================== */}
      <TheorySection title="5. Aumento di capitale sopra la pari">
        <TheoryParagraph>
          L’aumento sopra la pari si verifica quando il prezzo di emissione
          delle nuove azioni è superiore al valore nominale.
        </TheoryParagraph>

        <TheoryBox title="Effetti contabili">
          <TheoryList
            items={[
              "Il capitale sociale aumenta per il valore nominale.",
              "La differenza confluisce nella riserva sovrapprezzo azioni.",
            ]}
          />
        </TheoryBox>

        <TheoryTable
          title="Scrittura contabile"
          rows={[
            {
              conto_dare: "Banca c/c",
              importo_dare: "120.000",
              conto_avere: "Capitale sociale",
              importo_avere: "100.000",
            },
            {
              conto_avere: "Riserva sovrapprezzo azioni",
              importo_avere: "20.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 6. SOTTO LA PARI */}
      {/* ===================== */}
      <TheorySection title="6. Aumento di capitale sotto la pari">
        <TheoryParagraph>
          L’aumento sotto la pari si avrebbe qualora il prezzo di emissione
          fosse inferiore al valore nominale delle azioni.
        </TheoryParagraph>

        <TheoryBox title="Nota giuridica">
          Nel diritto societario italiano l’aumento di capitale sotto la pari
          <strong> non è consentito</strong>, in quanto viola il principio di
          integrità del capitale sociale.
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 7. SCHEMA FINALE */}
      {/* ===================== */}
      <TheorySection title="7. Schema riassuntivo finale">
        <TheoryList
          items={[
            "Aumento gratuito → utilizzo di riserve",
            "Aumento a pagamento → nuovi conferimenti",
            "Alla pari → solo Capitale sociale",
            "Sopra la pari → Capitale sociale + Riserva sovrapprezzo",
            "Sotto la pari → vietato",
          ]}
        />
      </TheorySection>
    </>
  );
}
