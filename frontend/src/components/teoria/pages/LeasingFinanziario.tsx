import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";

export default function LeasingFinanziarioTheory() {
  return (
    <>
      <TheoryTitle>Leasing Finanziario</TheoryTitle>

      <TheorySection title="1. Definizione di Leasing Finanziario">
        <TheoryParagraph>
          Il leasing finanziario è un contratto tramite il quale un locatore
          (società di leasing) concede al locatario il diritto di utilizzare un
          bene per un periodo determinato, dietro pagamento di canoni periodici.
          Al termine del contratto, il locatario può esercitare un'opzione di
          acquisto del bene a un prezzo prestabilito.
        </TheoryParagraph>

        <TheoryBox title="Caratteristiche principali">
          <ul>
            <li>
              Trasferimento sostanziale dei rischi e benefici del bene al
              locatario.
            </li>
            <li>
              Durata solitamente coincidente con la vita economica del bene.
            </li>
            <li>Possibile opzione di acquisto finale (prezzo di riscatto).</li>
            <li>
              Rilevazione contabile del cespite e del debito verso il locatore.
            </li>
            <li>
              Possibilità di versamento di un maxicanone iniziale che riduce i
              canoni successivi.
            </li>
          </ul>
        </TheoryBox>
      </TheorySection>

      <TheorySection title="2. Differenza rispetto al leasing operativo">
        <TheoryParagraph>
          A differenza del leasing operativo, nel leasing finanziario il
          locatario:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Assume sostanzialmente tutti i rischi e benefici del bene.",
            "Riconosce il bene come proprio nell'attivo patrimoniale e i debiti verso il locatore nel passivo.",
            "Effettua ammortamenti sul bene e rileva interessi passivi sui canoni finanziari.",
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Contabilizzazione del leasing finanziario">
        <TheorySection title="3.1 All'inizio del contratto">
          <TheoryParagraph>
            Alla stipula del leasing finanziario, il locatario rileva:
          </TheoryParagraph>
          <TheoryList
            items={[
              "Il bene in uso tra le immobilizzazioni materiali.",
              "Un debito finanziario verso il locatore pari al valore attuale dei canoni minimi.",
              "Eventuale maxicanone iniziale registrato come pagamento anticipato.",
            ]}
          />
        </TheorySection>

        <TheorySection title="3.2 Canoni periodici e competenza economica">
          <TheoryParagraph>
            Durante la vita del contratto, ogni canone periodico può essere
            suddiviso in quota capitale e quota interessi:
          </TheoryParagraph>
          <TheoryList
            items={[
              "Quota capitale: riduce il debito verso il locatore.",
              "Quota interessi: rilevata a conto economico come costo finanziario.",
              "Se il canone è pagato anticipatamente rispetto alla competenza dell’esercizio, la quota di costo non ancora maturata va rilevata come risconto attivo.",
            ]}
          />
        </TheorySection>

        <TheorySection title="3.3 Esercizio dell'opzione di riscatto">
          <TheoryParagraph>
            Alla scadenza del contratto, se il locatario esercita l'opzione di
            riscatto:
          </TheoryParagraph>
          <TheoryList
            items={[
              "Il bene diventa di proprietà definitiva.",
              "Il pagamento finale viene rilevato come estinzione del debito residuo.",
            ]}
          />
        </TheorySection>
      </TheorySection>

      <TheorySection title="4. Maxicanone">
        <TheoryParagraph>
          Il maxicanone è un canone iniziale più elevato rispetto ai successivi,
          che consente di ridurre l’importo dei canoni futuri e, di conseguenza,
          il debito residuo. In termini contabili:
        </TheoryParagraph>
        <TheoryList
          items={[
            "La quota riferita al periodo futuro viene rilevata come risconto attivo.",
            "La quota riferita al periodo corrente va a conto economico.",
          ]}
        />
        <TheoryBox title="Esempio">
          Leasing di un macchinario 100.000 € con maxicanone iniziale 40.000 € e
          3 canoni annuali successivi di 20.000 €.
          <br />
          La quota del maxicanone riferita agli esercizi futuri va registrata
          come risconto attivo, mentre quella di competenza dell’esercizio
          corrente è imputata a conto economico.
        </TheoryBox>
      </TheorySection>

      <TheorySection title="5. Esempio pratico completo">
        <TheoryBox title="Esempio">
          Acquisto di un macchinario del valore di 120.000 € tramite leasing
          finanziario di 4 anni, con maxicanone iniziale 40.000 € e tre canoni
          annuali di 32.000 €.
          <br />
          <strong>Rilevazione iniziale:</strong> macchinario 120.000 €, debito
          verso locatore 120.000 €, maxicanone 40.000 €.
          <br />
          <strong>Ogni anno:</strong> quota capitale 30.000 €, quota interessi
          2.000 €, risconto attivo per quota pagata anticipatamente.
          <br />
          <strong>Alla fine del contratto:</strong> pagamento prezzo di riscatto
          5.000 €, bene acquisito definitivamente.
        </TheoryBox>
      </TheorySection>

      <TheorySection title="6. Schema riassuntivo finale">
        <TheoryList
          items={[
            "Bene rilevato come immobilizzazione → Attivo patrimoniale",
            "Debito verso locatore → Passivo patrimoniale",
            "Canoni: quota capitale riduce debito, quota interessi rilevata a conto economico",
            "Eventuali pagamenti anticipati → Risconti attivi",
            "Maxicanone: quota anticipata da imputare come risconto attivo",
            "Alla fine del contratto il bene può essere riscattato al prezzo concordato",
          ]}
        />
      </TheorySection>
    </>
  );
}