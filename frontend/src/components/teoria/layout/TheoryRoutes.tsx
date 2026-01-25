import Indice from "../pages/Indice";
import GeneralAccountingTheory from "../pages/Generale";
import RateiERisconti from "../pages/RateiRisconti";
import LeasingFinanziarioTheory from "../pages/LeasingFinanziario";
import ImmobilizzazioniTheory from "../pages/Immobilizzazioni";
import AumentoCapitaleSocialeTheory from "../pages/AumentoCapitaleSociale";
import GuidaCodice from "../pages/GuidaCodice";
import GuidaContenuti from "../pages/GuidaContenuti";
import AcquistoEVenditaMerciIVA from "../pages/AcqVen";
import ScrittureAssestamentoTheory from "../pages/AssestamentoTheory";

export interface TheoryRoute {
  path: string;
  label: string;
  component: React.ComponentType; // <-- componente React, non JSX
}

export const theoryRoutes: TheoryRoute[] = [
  { path: "indice", label: "Indice", component: Indice },
  {
    path: "guida-ai-contenuti",
    label: "Guida ai contenuti",
    component: GuidaContenuti,
  },
  {
    path: "generale",
    label: "Contabilità generale",
    component: GeneralAccountingTheory,
  },
  {
    path: "acquisto-e-vendita",
    label: "Acquisto e Vendita",
    component: AcquistoEVenditaMerciIVA,
  },
  {
    path: "assestamento",
    label: "Scritture di assestamento",
    component: ScrittureAssestamentoTheory,
  },
  {
    path: "ratei-e-risconti",
    label: "Ratei e Risconti",
    component: RateiERisconti,
  },
  {
    path: "leasing",
    label: "Leasing finanziario",
    component: LeasingFinanziarioTheory,
  },
  {
    path: "immobilizzazioni-avanzate",
    label: "Immobilizzazioni avanzate",
    component: ImmobilizzazioniTheory,
  },
  {
    path: "aumento-capitale-sociale",
    label: "Aumento di Capitale Sociale",
    component: AumentoCapitaleSocialeTheory,
  },
  { path: "guida-codice", label: "Guida Codice", component: GuidaCodice },
];
