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

export interface RigaOperazione {
  id?: number;
  conto: number; // ID del mastrino
  conto_nome?: string;
  sezione: "D" | "A";
  importo: number | string;
}

export interface Operazione {
  id: number;
  data: string;
  descrizione: string;
  esercizio: number;
  righe: RigaOperazione[];
  created_at?: string;
}
