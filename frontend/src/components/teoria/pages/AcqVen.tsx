import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function AcquistoEVenditaMerciIVA() {
  return (
    <>
      <TheoryTitle>Acquisto e Vendita di Merci con IVA</TheoryTitle>

      {/* ===================== */}
      {/* 1. IVA: CONCETTI BASE */}
      {/* ===================== */}
      <TheorySection title="1. IVA: concetti fondamentali">
        <TheoryParagraph>
          L’IVA (Imposta sul Valore Aggiunto) è un’imposta indiretta che grava
          sul consumatore finale ma viene anticipata dalle imprese.
        </TheoryParagraph>

        <TheoryList
          items={[
            "IVA a credito → nasce sugli acquisti",
            "IVA a debito → nasce sulle vendite",
            "L’IVA non è un costo né un ricavo",
          ]}
        />

        <TheoryBox title="Idea chiave">
          L’azienda incassa l’IVA sulle vendite e paga l’IVA sugli acquisti, ma
          versa allo Stato solo la differenza.
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 2. ACQUISTO DI MERCI CON IVA */}
      {/* ===================== */}
      <TheorySection title="2. Acquisto di merci con IVA">
        <TheoryBox title="Esempio – Azienda Alfa">
          L’azienda Alfa acquista merci per 10.000 € + IVA 22% a credito.
        </TheoryBox>

        <TheoryParagraph>
          <strong>Scrittura di acquisto (fattura ricevuta)</strong>
        </TheoryParagraph>

        <TheoryTable
          rows={[
            {
              conto_dare: "Merci c/acquisti",
              importo_dare: "10.000",
              conto_avere: "Debiti v/fornitori",
              importo_avere: "12.200",
            },
            {
              conto_dare: "IVA a credito",
              importo_dare: "2.200",
              conto_avere: "",
              importo_avere: "",
            },
          ]}
        />

        <TheoryBox title="Osservazione">
          Prima del pagamento, l’importo totale della fattura confluisce nei
          <strong> Debiti v/fornitori</strong>.
        </TheoryBox>

        <TheoryParagraph>
          <strong>Scrittura di pagamento al fornitore</strong>
        </TheoryParagraph>

        <TheoryTable
          rows={[
            {
              conto_dare: "Debiti v/fornitori",
              importo_dare: "12.200",
              conto_avere: "Banca c/c",
              importo_avere: "12.200",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 3. VENDITA DI MERCI CON IVA */}
      {/* ===================== */}
      <TheorySection title="3. Vendita di merci con IVA">
        <TheoryBox title="Esempio – Azienda Beta">
          L’azienda Beta vende merci per 15.000 € + IVA 22% con pagamento
          differito.
        </TheoryBox>

        <TheoryParagraph>
          <strong>Scrittura di vendita (fattura emessa)</strong>
        </TheoryParagraph>

        <TheoryTable
          rows={[
            {
              conto_dare: "Crediti v/clienti",
              importo_dare: "18.300",
              conto_avere: "Merci c/vendite",
              importo_avere: "15.000",
            },
            {
              conto_dare: "",
              importo_dare: "",
              conto_avere: "IVA a debito",
              importo_avere: "3.300",
            },
          ]}
        />

        <TheoryParagraph>
          <strong>Scrittura di incasso dal cliente</strong>
        </TheoryParagraph>

        <TheoryTable
          rows={[
            {
              conto_dare: "Banca c/c",
              importo_dare: "18.300",
              conto_avere: "Crediti v/clienti",
              importo_avere: "18.300",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 4. LIQUIDAZIONE IVA */}
      {/* ===================== */}
      <TheorySection title="4. Liquidazione IVA">
        <TheoryParagraph>
          Periodicamente l’azienda confronta IVA a debito e IVA a credito per
          determinare l’IVA da versare o da recuperare.
        </TheoryParagraph>

        <TheoryBox title="Esempio di liquidazione">
          IVA a debito: 3.300 € <br />
          IVA a credito: 2.200 € <br />
          <strong>IVA da versare: 1.100 €</strong>
        </TheoryBox>

        <TheoryTable
          title="Scrittura di liquidazione IVA"
          rows={[
            {
              conto_dare: "IVA a debito",
              importo_dare: "3.300",
              conto_avere: "IVA a credito",
              importo_avere: "2.200",
            },
            {
              conto_dare: "",
              importo_dare: "",
              conto_avere: "Erario c/IVA",
              importo_avere: "1.100",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 5. SCHEMA RIASSUNTIVO */}
      {/* ===================== */}
      <TheorySection title="5. Schema riassuntivo">
        <TheoryBox title="Regole fondamentali">
          <strong>Acquisto:</strong> <br />
          Merci → DARE <br />
          IVA a credito → DARE <br />
          Debiti v/fornitori → AVERE <br />
          <br />
          <strong>Vendita:</strong> <br />
          Crediti v/clienti → DARE <br />
          Merci c/vendite → AVERE <br />
          IVA a debito → AVERE
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 6. COLLOCAZIONE IN BILANCIO */}
      {/* ===================== */}
      <TheorySection title="6. Collocazione in bilancio">
        <TheoryList
          items={[
            "IVA a credito → Stato Patrimoniale, Attivo",
            "IVA a debito → Stato Patrimoniale, Passivo",
            "Debiti v/fornitori → Stato Patrimoniale, Passivo",
            "Crediti v/clienti → Stato Patrimoniale, Attivo",
          ]}
        />
      </TheorySection>
    </>
  );
}
