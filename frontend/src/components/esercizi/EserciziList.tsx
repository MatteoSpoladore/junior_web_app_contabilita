import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

interface Esercizio {
  id: number;
  nome: string;
  categoria: string;
  difficolta: string;
  descrizione?: string;
}

export default function EserciziList() {
  const [esercizi, setEsercizi] = useState<Esercizio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEsercizi();
  }, []);

  async function fetchEsercizi() {
    setLoading(true);
    const { data, error } = await supabase.from("esercizi").select("*");
    if (!error) setEsercizi(data as Esercizio[]);
    setLoading(false);
  }

  return (
    <div className="p-5 text-white">
      <h1 className="text-3xl font-bold mb-4">Lista Esercizi</h1>

      {loading && <p>Caricamento...</p>}

      <ul className="space-y-3">
        {esercizi.map((es) => (
          <li
            key={es.id}
            className="bg-zinc-800 p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{es.nome}</h2>
              <p className="text-sm text-gray-300">
                {es.categoria} • {es.difficolta}
              </p>
            </div>

            <Link
              to={`/esercizio/${es.id}`}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Dettagli
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
