// frontend/src/types/index.ts

export interface Esercizio {
  id: number;
  nome: string;
  user: number;
}

export interface Mastrino {
  id: number;
  nome: string;
  codice: string;
  label: string;
  dare: string | number;
  avere: string | number;
  saldo: string | number;
}

export interface Scrittura {
  id: number;
  data: string;
  descrizione: string;
  importo: string | number;
  conto_dare: number;
  conto_avere: number;
  esercizio: number;
}
