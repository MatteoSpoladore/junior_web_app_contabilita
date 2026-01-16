import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";

export default function ImmobilizzazioniTheory() {
  return (
    <>
      <TheoryTitle>
        Immobilizzazioni Materiali: Permutazioni, Plus/Minusvalenze e
        Capitalizzazione di operazioni legate alle immobilizzazioni
      </TheoryTitle>

      <TheorySection title="1. Permutazioni di immobilizzazioni materiali">
        <TheoryParagraph>
          La permutazione di immobilizzazioni materiali consiste nello scambio
          di un bene con un altro, senza pagamento in denaro o con conguaglio.
          In contabilità, si rilevano le differenze tra valori contabili e
          valori di scambio.
        </TheoryParagraph>

        <TheoryBox title="Esempio di permutazione">
          Un'azienda scambia un macchinario del valore contabile di 50.000 € con
          un nuovo macchinario valutato 60.000 €.
          <br />
          <strong>Rilevazioni contabili:</strong>
          <ul>
            <li>
              Rimuovere il macchinario ceduto dal conto immobilizzazioni:
              -50.000 €
            </li>
            <li>Registrare il nuovo macchinario: +60.000 €</li>
            <li>
              Registrare il conguaglio in denaro, se presente, come pagamento o
              incasso
            </li>
          </ul>
        </TheoryBox>
      </TheorySection>

      <TheorySection title="2. Plusvalenze e minusvalenze">
        <TheoryParagraph>
          La differenza tra il prezzo di vendita o scambio di un bene e il suo
          valore contabile genera:
        </TheoryParagraph>
        <TheoryList
          items={[
            "Plusvalenza: ricavo derivante dalla vendita/scambio a un prezzo superiore al valore contabile",
            "Minusvalenza: perdita derivante dalla vendita/scambio a un prezzo inferiore al valore contabile",
          ]}
        />
        <TheoryBox title="Esempio pratico">
          Macchinario con valore contabile 40.000 € venduto per 50.000 € →
          plusvalenza 10.000 €
          <br />
          Macchinario con valore contabile 40.000 € venduto per 30.000 € →
          minusvalenza 10.000 €
        </TheoryBox>
      </TheorySection>

      <TheorySection title="3. Capitalizzazione dei costi legati alle immobilizzazioni materiali">
        <TheoryParagraph>
          Alcuni costi sostenuti dopo l'acquisto di un'immobilizzazione
          materiale possono essere capitalizzati se aumentano i benefici futuri
          del bene.
        </TheoryParagraph>

        <TheoryList
          items={[
            "Riparazioni straordinarie o miglioramenti incrementano il valore del bene",
            "Costi di montaggio, trasporto e installazione alla prima acquisizione",
            "Non si capitalizzano le spese ordinarie di manutenzione, che vanno a conto economico",
          ]}
        />

        <TheoryBox title="Esempio di capitalizzazione">
          Acquisto di un macchinario: 100.000 € Trasporto e installazione: 5.000
          € → capitalizzati Manutenzione ordinaria annuale: 2.000 € → spesa a
          conto economico
        </TheoryBox>
      </TheorySection>

      <TheorySection title="4. Schema riassuntivo">
        <TheoryList
          items={[
            "Permutazioni: rilevare il valore contabile del bene ceduto e del bene ricevuto",
            "Plusvalenze: ricavi da cessione > valore contabile",
            "Minusvalenze: perdite da cessione < valore contabile",
            "Capitalizzazione: costi che aumentano benefici futuri del bene → immobilizzazione",
            "Spese ordinarie → conto economico, non capitalizzate",
          ]}
        />
      </TheorySection>
    </>
  );
}
