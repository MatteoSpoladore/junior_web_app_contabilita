import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";

export default function RateiERisconti() {
  return (
    <>
      <TheoryTitle>Ratei e Risconti</TheoryTitle>

      <TheorySection title="1. Principio di competenza economica">
        <TheoryParagraph>
          Il principio di competenza economica stabilisce che i costi e i ricavi
          devono essere imputati all'esercizio in cui vengono effettivamente
          generati, indipendentemente dal momento in cui avviene il pagamento o
          l'incasso. Questo consente di rappresentare correttamente il reddito e
          il patrimonio dell'azienda.
        </TheoryParagraph>

        <TheoryBox title="Approfondimento">
          Spesso i pagamenti e gli incassi non coincidono con l'anno in cui il
          costo o il ricavo si forma. Per garantire che i conti riflettano la
          realtà economica, si utilizzano i ratei e i risconti, strumenti che
          permettono di riallineare i costi e i ricavi agli esercizi corretti.
        </TheoryBox>
      </TheorySection>

      <TheorySection title="2. Differenza fondamentale: Ratei vs Risconti">
        <TheoryParagraph>
          La distinzione tra ratei e risconti riguarda il momento in cui avviene
          il pagamento o l'incasso rispetto alla competenza economica:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Ratei: il pagamento o incasso avviene dopo la competenza, quindi rappresentano quote già maturate ma non ancora regolate.",
            "Risconti: il pagamento o incasso avviene prima della competenza, quindi rappresentano quote già regolate ma non ancora maturate.",
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Ratei">
        <TheorySection title="3.1 Cos'è un rateo">
          <TheoryParagraph>
            Un rateo è una quota di costo o di ricavo che è già maturata
            economicamente ma non è stata ancora pagata o incassata alla
            chiusura dell'esercizio. Serve a rappresentare correttamente le
            attività e le passività maturate.
          </TheoryParagraph>

          <TheoryList
            items={[
              "Già maturata dal punto di vista economico",
              "Non ancora pagata o incassata",
              "Rilevata alla data di chiusura dell’esercizio",
            ]}
          />
        </TheorySection>

        <TheorySection title="3.2 Rateo attivo">
          <TheoryBox title="Definizione">
            Il rateo attivo rappresenta un credito presunto per un ricavo già
            maturato ma che sarà incassato in esercizi futuri.
          </TheoryBox>

          <TheoryParagraph>
            È considerato attivo perché costituisce un diritto dell’azienda su
            risorse che saranno ricevute.
          </TheoryParagraph>

          <TheoryBox title="Esempio pratico">
            Un’azienda concede un prestito il 1° ottobre. Gli interessi annui
            ammontano a 1.200 €, e verranno incassati il 31 marzo dell’anno
            successivo. L’esercizio chiude il 31 dicembre.
            <br />
            Calcolo interessi maturati: ottobre-dicembre = 3 mesi → 1.200 × 3/12
            = 300 €.
            <br />
            Situazione: il ricavo è già maturato, ma l’incasso avverrà dopo;
            quindi il rateo attivo è 300 €.
          </TheoryBox>
        </TheorySection>

        <TheorySection title="3.3 Rateo passivo">
          <TheoryBox title="Definizione">
            Il rateo passivo rappresenta un debito presunto per un costo già
            maturato, ma che sarà pagato in esercizi futuri.
          </TheoryBox>

          <TheoryParagraph>
            È considerato passivo perché costituisce un’obbligazione
            dell’azienda verso terzi.
          </TheoryParagraph>

          <TheoryBox title="Esempio pratico">
            Affitto annuo 12.000 €, da pagare il 31 gennaio dell’anno
            successivo. L’esercizio chiude il 31 dicembre.
            <br />
            Calcolo: affitto mensile 1.000 €, mesi maturati 12.
            <br />
            Situazione: il costo è di competenza dell’esercizio, ma il pagamento
            avverrà dopo. Rateo passivo = 12.000 €.
          </TheoryBox>
        </TheorySection>
      </TheorySection>

      <TheorySection title="4. Risconti">
        <TheorySection title="4.1 Cos'è un risconto">
          <TheoryParagraph>
            Un risconto è una quota di costo o di ricavo che è stata già pagata
            o incassata, ma non è ancora maturata economicamente alla chiusura
            dell’esercizio.
          </TheoryParagraph>

          <TheoryList
            items={[
              "Non ancora maturata economicamente",
              "Già pagata o incassata",
              "Rilevata alla data di chiusura dell’esercizio",
            ]}
          />
        </TheorySection>

        <TheorySection title="4.2 Risconto attivo">
          <TheoryBox title="Definizione">
            Il risconto attivo rappresenta un costo pagato anticipatamente che
            non è di competenza dell’esercizio corrente.
          </TheoryBox>

          <TheoryParagraph>
            È considerato attivo perché rappresenta un credito verso esercizi
            futuri.
          </TheoryParagraph>

          <TheoryBox title="Esempio pratico">
            Assicurazione annuale 1.200 €, pagata il 1° ottobre, copertura
            ottobre → settembre anno successivo.
            <br />
            Esercizio chiude 31 dicembre.
            <br />
            Mesi non di competenza: gennaio → settembre = 9 mesi → Risconto
            attivo = 900 €.
          </TheoryBox>
        </TheorySection>

        <TheorySection title="4.3 Risconto passivo">
          <TheoryBox title="Definizione">
            Il risconto passivo rappresenta un ricavo incassato anticipatamente,
            che non è di competenza dell’esercizio corrente.
          </TheoryBox>

          <TheoryParagraph>
            È considerato passivo perché costituisce un debito verso esercizi
            futuri.
          </TheoryParagraph>

          <TheoryBox title="Esempio pratico">
            Abbonamento annuale incassato 1.200 €, incasso 1° ottobre, servizio
            ottobre → settembre anno successivo.
            <br />
            Esercizio chiude 31 dicembre.
            <br />
            Mesi non di competenza: gennaio → settembre = 9 mesi → Risconto
            passivo = 900 €.
          </TheoryBox>
        </TheorySection>
      </TheorySection>

      <TheorySection title="5. Schema riassuntivo finale">
        <TheoryParagraph>
          Riepilogo pratico per la comprensione e lo studio dei ratei e
          risconti:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Rateo attivo → Attivo → Ricavo → Pagamento dopo competenza → Già maturato",
            "Rateo passivo → Passivo → Costo → Pagamento dopo competenza → Già maturato",
            "Risconto attivo → Attivo → Costo → Pagamento prima competenza → Non maturato",
            "Risconto passivo → Passivo → Ricavo → Pagamento prima competenza → Non maturato",
          ]}
        />
      </TheorySection>
    </>
  );
}
