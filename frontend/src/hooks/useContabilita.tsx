import { useState, useEffect, useCallback } from "react";
import api from "../api";
import type { Operazione, Mastrino } from "../types";

export function useContabilita(esercizioId: number | null | undefined) {
  // Ora TypeScript sa esattamente cosa c'è dentro questi array
  const [operazione, setOperazione] = useState<Operazione[]>([]);
  const [mastrini, setMastrini] = useState<Mastrino[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback memorizza la funzione per evitare re-render inutili
  const refresh = useCallback(async () => {
    if (!esercizioId) return;

    setIsLoading(true);
    setError(null);
    try {
      // Esecuzione parallela delle chiamate API per dimezzare i tempi di attesa
      const [resOperazioni, resMastrini] = await Promise.all([
        api.get(`/operazioni/?esercizio=${esercizioId}`),
        api.get(`/mastrini/?esercizio=${esercizioId}`),
      ]);
      setOperazione(resOperazioni.data);
      setMastrini(resMastrini.data);
    } catch (err: any) {
      setError("Errore durante il recupero dei dati contabili.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [esercizioId]);

  // L'hook reagisce automaticamente ai cambiamenti di esercizioId
  useEffect(() => {
    refresh();
  }, [refresh]);

  return { operazione, mastrini, isLoading, error, refresh };
}
