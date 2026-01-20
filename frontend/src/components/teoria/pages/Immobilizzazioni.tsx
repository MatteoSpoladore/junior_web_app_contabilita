import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function ImmobilizzazioniTheory() {
  return (
    <>
      <TheoryTitle>
        Immobilizzazioni materiali: permutazioni, plus/minusvalenze e
        capitalizzazione
      </TheoryTitle>

      {/* ===================== */}
      {/* 1. PERMUTAZIONI */}
      {/* ===================== */}
      <TheorySection title="1. Permutazioni di immobilizzazioni materiali">
        <TheoryParagraph>
          La permutazione di immobilizzazioni materiali consiste nello scambio
          di un bene strumentale con un altro, con o senza conguaglio in denaro.
        </TheoryParagraph>

        <TheoryBox title="Idea chiave">
          Nella permutazione si confronta il <strong>valore contabile</strong>{" "}
          del bene ceduto con il <strong>valore attribuito</strong> al bene
          ricevuto.
        </TheoryBox>

        <TheoryBox title="Esempio">
          Un’azienda cede un macchinario con valore contabile di 50.000 € e
          riceve un nuovo macchinario valutato 60.000 €, pagando un conguaglio
          in denaro di 10.000 €.
        </TheoryBox>

        <TheoryTable
          rows={[
            {
              conto_dare: "Macchinari",
              importo_dare: "60.000",
              conto_avere: "Macchinari",
              importo_avere: "50.000",
            },
            {
              conto_dare: "",
              importo_dare: "",
              conto_avere: "Cassa/Banca",
              importo_avere: "10.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 2. PLUSVALENZE E MINUSVALENZE */}
      {/* ===================== */}
      <TheorySection title="2. Plusvalenze e minusvalenze">
        <TheoryList
          items={[
            "Plusvalenza: prezzo di cessione maggiore del valore contabile",
            "Minusvalenza: prezzo di cessione minore del valore contabile",
          ]}
        />

        {/* ===== ESEMPIO STRUTTURATO ===== */}
        <TheorySection title="2.1 Esempio svolto – Società Alfa">
          <TheoryParagraph>
            Al 1/1/n la società Alfa presenta i seguenti beni strumentali:
          </TheoryParagraph>

          <TheoryList
            items={[
              "Impianti: costo storico 100.000 – fondo ammortamento 80.000",
              "Macchinari: costo storico 50.000 – fondo ammortamento 40.000",
            ]}
          />

          <TheoryBox title="Prezzi di cessione">
            Impianti → 15.000 <br />
            Macchinari → 20.000
          </TheoryBox>

          {/* ----- IMPIANTI ----- */}
          <TheoryParagraph>
            <strong>Cessione degli impianti</strong>
          </TheoryParagraph>

          <TheoryTable
            title="Chiusura del fondo ammortamento impianti"
            rows={[
              {
                conto_dare: "Fondo ammortamento impianti",
                importo_dare: "80.000",
                conto_avere: "Impianti",
                importo_avere: "80.000",
              },
            ]}
          />

          <TheoryTable
            title="Cessione con minusvalenza"
            rows={[
              {
                conto_dare: "Banca",
                importo_dare: "15.000",
                conto_avere: "Impianti",
                importo_avere: "20.000",
              },
              {
                conto_dare: "Minusvalenze",
                importo_dare: "5.000",
                conto_avere: "",
                importo_avere: "",
              },
            ]}
          />

          {/* ----- MACCHINARI ----- */}
          <TheoryParagraph>
            <strong>Cessione dei macchinari</strong>
          </TheoryParagraph>

          <TheoryTable
            title="Chiusura del fondo ammortamento macchinari"
            rows={[
              {
                conto_dare: "Fondo ammortamento macchinari",
                importo_dare: "40.000",
                conto_avere: "Macchinari",
                importo_avere: "40.000",
              },
            ]}
          />

          <TheoryTable
            title="Cessione con plusvalenza"
            rows={[
              {
                conto_dare: "Banca",
                importo_dare: "20.000",
                conto_avere: "Macchinari",
                importo_avere: "10.000",
              },
              {
                conto_dare: "",
                importo_dare: "",
                conto_avere: "Plusvalenze",
                importo_avere: "10.000",
              },
            ]}
          />
        </TheorySection>
      </TheorySection>

      {/* ===================== */}
      {/* 3. CAPITALIZZAZIONE */}
      {/* ===================== */}
      <TheorySection title="3. Capitalizzazione dei costi sulle immobilizzazioni">
        <TheoryParagraph>
          I costi che aumentano i benefici futuri di un bene vengono
          capitalizzati.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Costi di acquisto e installazione",
            "Riparazioni straordinarie",
            "Escluse le manutenzioni ordinarie",
          ]}
        />

        <TheoryTable
          rows={[
            {
              conto_dare: "Macchinari",
              importo_dare: "105.000",
              conto_avere: "Debiti v/fornitori",
              importo_avere: "105.000",
            },
          ]}
        />

        <TheoryTable
          title="Manutenzione ordinaria"
          rows={[
            {
              conto_dare: "Costi di manutenzione",
              importo_dare: "2.000",
              conto_avere: "Cassa/Banca",
              importo_avere: "2.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 4. SCHEMA RIASSUNTIVO */}
      {/* ===================== */}
      <TheorySection title="4. Schema riassuntivo">
        <TheoryList
          items={[
            "Plusvalenze → ricavi",
            "Minusvalenze → costi",
            "Fondo ammortamento sempre chiuso prima della cessione",
          ]}
        />
      </TheorySection>
    </>
  );
}
