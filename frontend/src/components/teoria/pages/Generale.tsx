import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";

export default function GeneralAccountingTheory() {
  return (
    <>
      <TheoryTitle>Contabilità Generale</TheoryTitle>

      <TheoryParagraph>
        La contabilità generale è il sistema di rilevazione che consente di
        rappresentare in modo sistematico e continuo le operazioni aziendali.
      </TheoryParagraph>

      <TheorySection title="Finalità">
        <TheoryList
          items={[
            "Determinare il reddito d’esercizio",
            "Rappresentare il patrimonio aziendale",
            "Fornire informazioni a soggetti interni ed esterni",
          ]}
        />
      </TheorySection>

      <TheorySection title="Metodo della partita doppia">
        <TheoryParagraph>
          Ogni operazione viene registrata in due sezioni contrapposte: Dare e
          Avere.
        </TheoryParagraph>

        <TheoryBox title="Regola fondamentale">
          A ogni addebito deve corrispondere un accredito di pari importo.
        </TheoryBox>
      </TheorySection>
    </>
  );
}
