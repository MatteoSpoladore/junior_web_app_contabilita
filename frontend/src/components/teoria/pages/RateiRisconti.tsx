import TheoryTitle from "../layout/TheoryTitle";
import TheorySection from "../layout/TheorySection";
import TheoryParagraph from "../layout/TheoryParagraph";
import TheoryList from "../layout/TheoryList";
import TheoryBox from "../layout/TheoryBox";
import TheoryTable from "../layout/TheoryTable";

export default function RateiERisconti() {
  return (
    <>
      <TheoryTitle>Ratei e Risconti</TheoryTitle>

      {/* ===================== */}
      {/* 1. PRINCIPIO DI COMPETENZA */}
      {/* ===================== */}
      <TheorySection title="1. Principio di competenza economica">
        <TheoryParagraph>
          Il principio di competenza economica impone che costi e ricavi siano
          imputati all’esercizio cui si riferiscono, indipendentemente dal
          momento dell’incasso o del pagamento.
        </TheoryParagraph>

        <TheoryBox title="Idea chiave">
          Quando incasso o pago in un momento diverso rispetto alla competenza
          economica, devo effettuare scritture di assestamento per riallineare
          costi e ricavi all’esercizio corretto.
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 2. LOGICA OPERATIVA */}
      {/* ===================== */}
      <TheorySection title="2. Logica operativa per riconoscere ratei e risconti">
        <TheoryList
          items={[
            "Capire chi paga o incassa (azienda o terzi).",
            "Capire se il pagamento/incasso è anticipato o posticipato.",
            "Individuare se si tratta di rateo o risconto, attivo o passivo.",
            "Capire la natura del conto di competenza (costo o ricavo).",
          ]}
        />

        <TheoryBox title="Regola pratica">
          <strong>Anticipato → Risconto</strong> <br />
          <strong>Posticipato → Rateo</strong> <br />
          <strong>Paga/incassa l’azienda → Attivo</strong> <br />
          <strong>Paga/incassa il terzo → Passivo</strong>
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 3. RISCONTI */}
      {/* ===================== */}
      <TheorySection title="3. Risconti (pagamento o incasso anticipato)">
        {/* -------- RISCONTO ATTIVO -------- */}
        <TheorySection title="3.1 Risconto attivo">
          <TheoryParagraph>
            Il risconto attivo riguarda un costo già pagato dall’azienda ma non
            ancora di competenza dell’esercizio.
          </TheoryParagraph>

          <TheoryBox title="Esempio – Azienda Alfa">
            L’azienda Alfa paga il 1/9 spese di sorveglianza annuali anticipate
            per 1.200 €.
            <br />
            Poiché il pagamento è anticipato e paga l’azienda, si tratta di un
            <strong> risconto attivo</strong>.
          </TheoryBox>

          <TheoryParagraph>
            <strong>Scrittura al momento del pagamento (1/9)</strong>
          </TheoryParagraph>

          <TheoryTable
            rows={[
              {
                conto_dare: "Spese di sorveglianza",
                importo_dare: "1.200",
                conto_avere: "Cassa",
                importo_avere: "1.200",
              },
            ]}
          />

          <TheoryParagraph>
            Al 31/12 una parte del costo non è di competenza dell’esercizio e va
            rinviata all’anno successivo tramite risconto attivo.
          </TheoryParagraph>

          <TheoryTable
            title="Scrittura di assestamento al 31/12"
            rows={[
              {
                conto_dare: "Risconti attivi",
                importo_dare: "800",
                conto_avere: "Spese di sorveglianza",
                importo_avere: "800",
              },
            ]}
          />
        </TheorySection>

        {/* -------- RISCONTO PASSIVO -------- */}
        <TheorySection title="3.2 Risconto passivo">
          <TheoryParagraph>
            Il risconto passivo riguarda un ricavo già incassato ma non ancora
            di competenza dell’esercizio.
          </TheoryParagraph>

          <TheoryBox title="Esempio – Azienda Beta">
            L’azienda Beta incassa il 1/12 un fitto attivo annuo di 1.800 €.
            <br />
            Poiché l’incasso è anticipato e riguarda un ricavo, si tratta di un
            <strong> risconto passivo</strong>.
          </TheoryBox>

          <TheoryParagraph>
            <strong>Scrittura al momento dell’incasso (1/12)</strong>
          </TheoryParagraph>

          <TheoryTable
            rows={[
              {
                conto_dare: "Cassa",
                importo_dare: "1.800",
                conto_avere: "Fitti attivi",
                importo_avere: "1.800",
              },
            ]}
          />

          <TheoryParagraph>
            Al 31/12 la parte di ricavo non di competenza deve essere rinviata
            all’esercizio successivo.
          </TheoryParagraph>

          <TheoryTable
            title="Scrittura di assestamento al 31/12"
            rows={[
              {
                conto_dare: "Fitti attivi",
                importo_dare: "1.650",
                conto_avere: "Risconti passivi",
                importo_avere: "1.650",
              },
            ]}
          />
        </TheorySection>
      </TheorySection>

      {/* ===================== */}
      {/* 4. RATEI */}
      {/* ===================== */}
      <TheorySection title="4. Ratei (pagamento o incasso posticipato)">
        {/* -------- RATEO PASSIVO -------- */}
        <TheorySection title="4.1 Rateo passivo">
          <TheoryBox title="Esempio – Società Omega">
            La società Omega paga spese di sorveglianza annuali per 1.200 € il
            31/3 dell’anno successivo.
            <br />
            Il pagamento è posticipato e riguarda un costo → rateo passivo.
          </TheoryBox>

          <TheoryTable
            title="Scrittura di assestamento al 31/12"
            rows={[
              {
                conto_dare: "Spese di sorveglianza",
                importo_dare: "900",
                conto_avere: "Ratei passivi",
                importo_avere: "900",
              },
            ]}
          />
        </TheorySection>

        {/* -------- RATEO ATTIVO -------- */}
        <TheorySection title="4.2 Rateo attivo">
          <TheoryBox title="Esempio – Società Iota">
            La società Iota incassa interessi attivi posticipatamente il 30/11
            per 1.200 €.
            <br />
            L’incasso è posticipato e riguarda un ricavo → rateo attivo.
          </TheoryBox>

          <TheoryTable
            title="Scrittura di assestamento al 31/12"
            rows={[
              {
                conto_dare: "Ratei attivi",
                importo_dare: "200",
                conto_avere: "Interessi attivi",
                importo_avere: "200",
              },
            ]}
          />
        </TheorySection>
      </TheorySection>

      {/* ===================== */}
      {/* 5. CONSIGLIO PER NON SBAGLIARE */}
      {/* ===================== */}
      <TheorySection title="5. Come non sbagliare la scrittura">
        <TheoryBox title="Metodo">
          Se individui correttamente se è rateo o risconto e se è attivo o
          passivo, il secondo conto è automatico:
          <br />
          <strong>
            Rateo/Risconto attivo → conto di costo o ricavo in AVERE
          </strong>
          <br />
          <strong>
            Rateo/Risconto passivo → conto di costo o ricavo in DARE
          </strong>
        </TheoryBox>
      </TheorySection>

      {/* ===================== */}
      {/* 6. COLLOCAZIONE IN BILANCIO */}
      {/* ===================== */}
      <TheorySection title="6. Collocazione in bilancio">
        <TheoryParagraph>
          Ratei e risconti sono voci dello Stato Patrimoniale e trovano
          collocazione specifica:
        </TheoryParagraph>

        <TheoryList
          items={[
            "Ratei e risconti attivi → Stato Patrimoniale, Attivo (fine attivo)",
            "Ratei e risconti passivi → Stato Patrimoniale, Passivo (fine passivo)",
          ]}
        />
      </TheorySection>
    </>
  );
}
