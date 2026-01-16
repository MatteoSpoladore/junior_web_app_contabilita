import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";

export default function Indice() {
  return (
    <>
      <TheoryTitle>Indice</TheoryTitle>

      <TheoryParagraph>
        Questa sezione è dedicata ai principali concetti teorici relativi alla
        contabilità generale e alla contabilità analitica, fondamentali per la
        comprensione del funzionamento economico e finanziario dell’impresa.
      </TheoryParagraph>

      <TheorySection title="Contenuti della sezione">
        <TheoryList
          items={[
            "Principi fondamentali della contabilità generale",
            "Concetti base di reddito e patrimonio",
            "Elementi introduttivi della contabilità analitica",
            "Finalità informative e decisionali",
          ]}
        />
      </TheorySection>

      <TheorySection title="Navigazione">
        <TheoryParagraph>
          È possibile navigare e consultare i principali concetti teorici
          utilizzando la barra di navigazione presente sulla sinistra.
        </TheoryParagraph>

        <TheoryBox title="Suggerimento">
          In qualsiasi momento puoi tornare alla homepage tramite il pulsante
          posizionato in alto a destra.
        </TheoryBox>
      </TheorySection>
    </>
  );
}
