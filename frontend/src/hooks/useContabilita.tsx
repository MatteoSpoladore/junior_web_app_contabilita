import { useState, useEffect, useCallback } from "react";
import api from "../api";

export function useContabilita(esercizioId: number | null | undefined) {
  const [scritture, setScritture] = useState<any[]>([]);
  const [mastrini, setMastrini] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback memorizza la funzione per evitare re-render inutili
  const refresh = useCallback(async () => {
    if (!esercizioId) return;

    setIsLoading(true);
    setError(null);
    try {
      // Esecuzione parallela delle chiamate API per dimezzare i tempi di attesa
      const [resScritture, resMastrini] = await Promise.all([
        api.get(`/scritture/?esercizio=${esercizioId}`),
        api.get(`/mastrini/?esercizio=${esercizioId}`),
      ]);
      setScritture(resScritture.data);
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

  return { scritture, mastrini, isLoading, error, refresh };
}
