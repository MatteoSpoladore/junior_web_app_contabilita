import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function MutuiTheory() {
  return (
    <>
      <TheoryTitle>
        Mutui passivi e mutui attivi: rilevazione, interessi e rimborso
      </TheoryTitle>

      {/* ===================== */}
      {/* 1. MUTUI PASSIVI */}
      {/* ===================== */}
      <TheorySection title="1. Mutui passivi">
        <TheoryParagraph>
          Il mutuo passivo è un finanziamento ottenuto dall’azienda da un
          istituto di credito, che genera un debito a medio-lungo termine.
        </TheoryParagraph>

        <TheoryBox title="Idea chiave">
          Il mutuo passivo comporta la rilevazione di un debito e il pagamento
          periodico di rate composte da <strong>quota capitale</strong> e
          <strong> quota interessi</strong>.
        </TheoryBox>

        <TheoryBox title="Esempio">
          L’azienda ottiene un mutuo di 100.000 € accreditato sul conto
          corrente.
        </TheoryBox>

        <TheoryTable
          title="Accensione del mutuo"
          rows={[
            {
              conto_dare: "Banca",
              importo_dare: "100.000",
              conto_avere: "Mutui passivi",
              importo_avere: "100.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 2. PAGAMENTO DELLE RATE */}
      {/* ===================== */}
      <TheorySection title="2. Pagamento delle rate del mutuo passivo">
        <TheoryParagraph>
          Ogni rata del mutuo è composta da una quota capitale (che riduce il
          debito) e da una quota interessi (che rappresenta un costo).
        </TheoryParagraph>

        <TheoryBox title="Esempio">
          Rata di 6.000 € composta da:
          <br />– quota capitale: 4.500 €
          <br />– quota interessi: 1.500 €
        </TheoryBox>

        <TheoryTable
          rows={[
            {
              conto_dare: "Mutui passivi",
              importo_dare: "4.500",
              conto_avere: "Banca",
              importo_avere: "6.000",
            },
            {
              conto_dare: "Interessi passivi",
              importo_dare: "1.500",
              conto_avere: "",
              importo_avere: "",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 3. MUTUI ATTIVI */}
      {/* ===================== */}
      <TheorySection title="3. Mutui attivi">
        <TheoryParagraph>
          Il mutuo attivo è un finanziamento concesso dall’azienda a terzi, che
          genera un credito a medio-lungo termine.
        </TheoryParagraph>

        <TheoryBox title="Idea chiave">
          Il mutuo attivo rappresenta un impiego finanziario e produce
          <strong> interessi attivi</strong>, che costituiscono un ricavo.
        </TheoryBox>

        <TheoryBox title="Esempio">
          L’azienda concede un mutuo di 50.000 € a un soggetto terzo.
        </TheoryBox>

        <TheoryTable
          title="Concessione del mutuo"
          rows={[
            {
              conto_dare: "Mutui attivi",
              importo_dare: "50.000",
              conto_avere: "Banca",
              importo_avere: "50.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 4. INCASSO DELLE RATE */}
      {/* ===================== */}
      <TheorySection title="4. Incasso delle rate del mutuo attivo">
        <TheoryParagraph>
          L’incasso delle rate del mutuo attivo comprende una quota capitale e
          una quota interessi.
        </TheoryParagraph>

        <TheoryBox title="Esempio">
          Rata incassata di 3.500 € composta da:
          <br />– quota capitale: 3.000 €
          <br />– quota interessi: 500 €
        </TheoryBox>

        <TheoryTable
          rows={[
            {
              conto_dare: "Banca",
              importo_dare: "3.500",
              conto_avere: "Mutui attivi",
              importo_avere: "3.000",
            },
            {
              conto_dare: "",
              importo_dare: "",
              conto_avere: "Interessi attivi",
              importo_avere: "500",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 5. SCHEMA RIASSUNTIVO */}
      {/* ===================== */}
      <TheorySection title="5. Schema riassuntivo">
        <TheoryList
          items={[
            "Mutui passivi → debiti a medio-lungo termine",
            "Interessi passivi → costi",
            "Mutui attivi → crediti a medio-lungo termine",
            "Interessi attivi → ricavi",
          ]}
        />
      </TheorySection>
    </>
  );
}
