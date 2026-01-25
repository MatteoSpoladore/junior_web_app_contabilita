import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function ScrittureAssestamentoTheory() {
  return (
    <>
      <TheoryTitle>
        Scritture di assestamento: ammortamenti, ratei, risconti e svalutazioni
      </TheoryTitle>

      {/* ===================== */}
      {/* 1. SCRITTURE DI ASSESTAMENTO */}
      {/* ===================== */}
      <TheorySection title="1. Le scritture di assestamento">
        <TheoryParagraph>
          Le scritture di assestamento hanno lo scopo di adeguare i valori di
          bilancio al principio di competenza economica, imputando a ciascun
          esercizio i costi e i ricavi di competenza.
        </TheoryParagraph>

        <TheoryBox title="Finalità">
          Garantire la corretta determinazione del{" "}
          <strong>reddito d’esercizio</strong> e del{" "}
          <strong>patrimonio di funzionamento</strong>.
        </TheoryBox>

        <TheoryList
          items={[
            "Ammortamenti",
            "Ratei attivi e passivi",
            "Risconti attivi e passivi",
            "Svalutazioni dei crediti",
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 2. AMMORTAMENTI */}
      {/* ===================== */}
      <TheorySection title="2. Ammortamenti delle immobilizzazioni">
        <TheoryParagraph>
          L’ammortamento è il procedimento contabile mediante il quale il costo
          di un bene pluriennale viene ripartito sistematicamente tra più
          esercizi.
        </TheoryParagraph>

        <TheoryBox title="Idea chiave">
          L’ammortamento rappresenta un <strong>costo di competenza</strong>{" "}
          dell’esercizio, anche se non comporta un’uscita monetaria.
        </TheoryBox>

        <TheoryParagraph>
          <strong>Esempio</strong>: un macchinario del costo di 100.000 € viene
          ammortizzato al 10% annuo.
        </TheoryParagraph>

        <TheoryTable
          title="Scrittura di ammortamento"
          rows={[
            {
              conto_dare: "Ammortamento macchinari",
              importo_dare: "10.000",
              conto_avere: "Fondo ammortamento macchinari",
              importo_avere: "10.000",
            },
          ]}
        />

        <TheoryBox title="Effetto sul bilancio">
          Il fondo ammortamento rettifica indirettamente il valore
          dell’immobilizzazione nello Stato Patrimoniale.
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 3. RATEI */}
      {/* ===================== */}
      <TheorySection title="3. Ratei attivi e passivi">
        <TheoryParagraph>
          I ratei rappresentano quote di costi o ricavi di competenza
          dell’esercizio che avranno manifestazione finanziaria in esercizi
          successivi.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Ratei attivi → crediti presunti",
            "Ratei passivi → debiti presunti",
          ]}
        />

        <TheoryParagraph>
          <strong>Esempio di rateo passivo</strong>: interessi passivi maturati
          per 3.000 € ma non ancora pagati.
        </TheoryParagraph>

        <TheoryTable
          rows={[
            {
              conto_dare: "Interessi passivi",
              importo_dare: "3.000",
              conto_avere: "Ratei passivi",
              importo_avere: "3.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 4. RISCONTI */}
      {/* ===================== */}
      <TheorySection title="4. Risconti attivi e passivi">
        <TheoryParagraph>
          I risconti consentono di rinviare a esercizi futuri costi o ricavi già
          sostenuti o incassati, ma non ancora di competenza.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Risconti attivi → costi sospesi",
            "Risconti passivi → ricavi sospesi",
          ]}
        />

        <TheoryParagraph>
          <strong>Esempio di risconto attivo</strong>: premio assicurativo
          pagato anticipatamente per 12.000 €, di cui 4.000 di competenza
          dell’anno successivo.
        </TheoryParagraph>

        <TheoryTable
          rows={[
            {
              conto_dare: "Risconti attivi",
              importo_dare: "4.000",
              conto_avere: "Costi assicurativi",
              importo_avere: "4.000",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 5. SVALUTAZIONE CREDITI */}
      {/* ===================== */}
      <TheorySection title="5. Svalutazione dei crediti">
        <TheoryParagraph>
          La svalutazione dei crediti è una scrittura di assestamento che tiene
          conto del rischio di inesigibilità dei crediti.
        </TheoryParagraph>

        <TheoryBox title="Principio applicato">
          Principio di <strong>prudenza</strong>: i crediti devono essere
          iscritti al presumibile valore di realizzo.
        </TheoryBox>

        <TheoryParagraph>
          <strong>Esempio</strong>: svalutazione crediti stimata in 2.500 €.
        </TheoryParagraph>

        <TheoryTable
          rows={[
            {
              conto_dare: "Svalutazione crediti",
              importo_dare: "2.500",
              conto_avere: "Fondo svalutazione crediti",
              importo_avere: "2.500",
            },
          ]}
        />
      </TheorySection>

      {/* ===================== */}
      {/* 6. SCHEMA RIASSUNTIVO */}
      {/* ===================== */}
      <TheorySection title="6. Schema riassuntivo delle scritture di assestamento">
        <TheoryList
          items={[
            "Ammortamenti → ripartizione dei costi pluriennali",
            "Ratei → competenza senza manifestazione finanziaria",
            "Risconti → sospensione di costi o ricavi",
            "Svalutazioni → applicazione del principio di prudenza",
          ]}
        />
      </TheorySection>
    </>
  );
}
