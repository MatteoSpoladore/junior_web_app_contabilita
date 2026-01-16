import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import api from "../../api";

export default function ScritturaForm({ mastrini, esercizioId, onSaved }: any) {
  /**
   * Stato del form
   * - data inizializzata a oggi
   * - conti null per forzare selezione esplicita
   */
  const [form, setForm] = useState({
    data: new Date().toISOString().split("T")[0],
    descrizione: "",
    conto_dare: null as any,
    conto_avere: null as any,
    importo: "",
  });

  /**
   * Refs per gestione focus progressivo
   * Permette una compilazione rapida solo da tastiera
   */
  const descrizioneRef = useRef<HTMLInputElement>(null);
  const dareRef = useRef<HTMLInputElement>(null);
  const avereRef = useRef<HTMLInputElement>(null);
  const importoRef = useRef<HTMLInputElement>(null);

  /**
   * Validazione UX:
   * impedisce che Dare e Avere siano lo stesso conto
   */
  const sameAccount =
    form.conto_dare &&
    form.conto_avere &&
    form.conto_dare.id === form.conto_avere.id;

  /**
   * Salvataggio scrittura
   * - bloccato se mancano dati obbligatori
   * - bloccato se Dare === Avere
   * - reset parziale del form per inserimenti seriali
   */
  const save = async (e?: any) => {
    e?.preventDefault();

    if (!form.conto_dare || !form.conto_avere || !form.importo || sameAccount)
      return;

    await api.post("/scritture/", {
      esercizio: esercizioId,
      data: form.data,
      descrizione: form.descrizione,
      conto_dare: form.conto_dare.id,
      conto_avere: form.conto_avere.id,
      importo: form.importo,
    });

    onSaved();

    // Reset mirato: manteniamo data e focus per inserimento rapido
    setForm((f) => ({
      ...f,
      descrizione: "",
      importo: "",
      conto_dare: null,
      conto_avere: null,
    }));

    // UX: dopo il salvataggio si riparte subito dalla descrizione
    descrizioneRef.current?.focus();
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <form onSubmit={save}>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* 
              Data
              - Enter sposta il focus sulla descrizione
            */}
            <TextField
              type="date"
              label="Data"
              InputLabelProps={{ shrink: true }}
              size="small"
              sx={{ width: 150 }}
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
              onKeyDown={(e) =>
                e.key === "Enter" && descrizioneRef.current?.focus()
              }
            />

            {/* 
              Descrizione
              - Campo libero
              - Enter porta al conto Dare
            */}
            <TextField
              label="Descrizione"
              size="small"
              sx={{ width: 250 }}
              inputRef={descrizioneRef}
              value={form.descrizione}
              onChange={(e) =>
                setForm({ ...form, descrizione: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && dareRef.current?.focus()}
            />

            {/* 
              Conto Dare
              Feature UX:
              - autoHighlight: primo risultato evidenziato
              - Enter seleziona subito il primo conto
              - Dopo la selezione focus automatico su Avere
            */}
            <Autocomplete
              autoHighlight
              size="small"
              sx={{ width: 200 }}
              options={mastrini}
              getOptionLabel={(o: any) => o.label || o.nome || ""}
              value={form.conto_dare}
              onChange={(_, v) => {
                setForm({ ...form, conto_dare: v });
                avereRef.current?.focus();
              }}
              renderInput={(p) => (
                <TextField
                  {...p}
                  label="Conto Dare"
                  inputRef={dareRef}
                  error={sameAccount}
                />
              )}
            />

            {/* 
              Conto Avere
              Feature UX:
              - autoHighlight come Dare
              - Validazione immediata Dare ≠ Avere
              - Feedback visivo tramite error + helperText
            */}
            <Autocomplete
              autoHighlight
              size="small"
              sx={{ width: 200 }}
              options={mastrini}
              getOptionLabel={(o: any) => o.label || o.nome || ""}
              value={form.conto_avere}
              onChange={(_, v) => {
                setForm({ ...form, conto_avere: v });
                importoRef.current?.focus();
              }}
              renderInput={(p) => (
                <TextField
                  {...p}
                  label="Conto Avere"
                  inputRef={avereRef}
                  error={sameAccount}
                  // helperText={
                  //   sameAccount ? "Dare e Avere non possono coincidere" : ""
                  // }
                />
              )}
            />

            {/* 
              Importo
              - Enter esegue il salvataggio
              - Pensato per inserimenti rapidi consecutivi
            */}
            <TextField
              label="Importo"
              type="number"
              size="small"
              sx={{ width: 150 }}
              inputRef={importoRef}
              value={form.importo}
              onChange={(e) => setForm({ ...form, importo: e.target.value })}
              // onKeyDown={(e) => e.key === "Enter" && save()} ❌ rimosso onKeyDown
            />

            {/* 
              Pulsante Registra
              - Disabilitato in caso di errore contabile
            */}
            <Button
              type="submit"
              variant="contained"
              sx={{ px: 3 }}
              disabled={sameAccount}
            >
              Registra
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Stack,
//   TextField,
//   Button,
//   Autocomplete,
// } from "@mui/material";
// import api from "../../api";

// export default function ScritturaForm({ mastrini, esercizioId, onSaved }: any) {
//   const [form, setForm] = useState({
//     data: new Date().toISOString().split("T")[0],
//     descrizione: "",
//     conto_dare: null as any,
//     conto_avere: null as any,
//     importo: "",
//   });

//   const save = async (e: any) => {
//     e.preventDefault();
//     if (!form.conto_dare || !form.conto_avere || !form.importo) return;

//     await api.post("/scritture/", {
//       esercizio: esercizioId,
//       data: form.data,
//       descrizione: form.descrizione,
//       conto_dare: form.conto_dare.id,
//       conto_avere: form.conto_avere.id,
//       importo: form.importo,
//     });

//     onSaved();
//     setForm({
//       ...form,
//       descrizione: "",
//       importo: "",
//       conto_dare: null,
//       conto_avere: null,
//     });
//   };

//   return (
//     <Card elevation={2}>
//       <CardContent>
//         <form onSubmit={save}>
//           <Stack direction="row" spacing={2}>
//             <TextField
//               type="date"
//               label="Data"
//               InputLabelProps={{ shrink: true }}
//               size="small"
//               sx={{ width: 150 }}
//               value={form.data}
//               onChange={(e) => setForm({ ...form, data: e.target.value })}
//             />

//             <TextField
//               label="Descrizione"
//               size="small"
//               sx={{ width: 250 }}
//               value={form.descrizione}
//               onChange={(e) =>
//                 setForm({ ...form, descrizione: e.target.value })
//               }
//             />

//             <Autocomplete
//               size="small"
//               sx={{ width: 200 }}
//               options={mastrini}
//               getOptionLabel={(o: any) => o.label || o.nome || ""}
//               value={form.conto_dare}
//               onChange={(_, v) => setForm({ ...form, conto_dare: v })}
//               renderInput={(p) => <TextField {...p} label="Conto Dare" />}
//             />

//             <Autocomplete
//               size="small"
//               sx={{ width: 200 }}
//               options={mastrini}
//               getOptionLabel={(o: any) => o.label || o.nome || ""}
//               value={form.conto_avere}
//               onChange={(_, v) => setForm({ ...form, conto_avere: v })}
//               renderInput={(p) => <TextField {...p} label="Conto Avere" />}
//             />

//             <TextField
//               label="Importo"
//               type="number"
//               size="small"
//               sx={{ width: 150 }}
//               value={form.importo}
//               onChange={(e) => setForm({ ...form, importo: e.target.value })}
//             />

//             <Button type="submit" variant="contained" sx={{ px: 3 }}>
//               Registra
//             </Button>
//           </Stack>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
