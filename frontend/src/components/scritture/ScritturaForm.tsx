import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Collapse,
} from "@mui/material";
import api from "../../api";

const ROWS_COUNT = 6;

type Row = {
  data: string;
  descrizione: string;
  conto_dare: any | null;
  conto_avere: any | null;
  importo: string;
};

const emptyRow = (): Row => ({
  data: new Date().toISOString().split("T")[0],
  descrizione: "",
  conto_dare: null,
  conto_avere: null,
  importo: "",
});

export default function ScritturaForm({ mastrini, esercizioId, onSaved }: any) {
  const [multi, setMulti] = useState(false);

  const [rows, setRows] = useState<Row[]>(
    Array.from({ length: ROWS_COUNT }, emptyRow),
  );

  const [rowErrors, setRowErrors] = useState<boolean[]>(
    Array.from({ length: ROWS_COUNT }, () => false),
  );

  const descrizioneRef = useRef<HTMLInputElement>(null);

  const isRowEmpty = (r: Row) => !r.conto_dare && !r.conto_avere && !r.importo;

  const isRowComplete = (r: Row) => r.conto_dare && r.conto_avere && r.importo;

  const sameAccount = (r: Row) =>
    r.conto_dare && r.conto_avere && r.conto_dare.id === r.conto_avere.id;

  const updateRow = (i: number, updater: (r: Row) => Row) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[i] = updater(copy[i]);

      const nowValid =
        isRowEmpty(copy[i]) ||
        (isRowComplete(copy[i]) && !sameAccount(copy[i]));

      if (nowValid && rowErrors[i]) {
        setRowErrors((errs) => {
          const e = [...errs];
          e[i] = false;
          return e;
        });
      }

      return copy;
    });
  };

  const save = async (e?: any) => {
    e?.preventDefault();

    const visibleRows = rows.map((r, i) => (i === 0 || multi ? r : null));

    const errors = visibleRows.map((r) => {
      if (!r) return false;
      const incomplete = !isRowEmpty(r) && !isRowComplete(r);
      return incomplete || sameAccount(r);
    });

    setRowErrors(errors);

    if (errors.some(Boolean)) return;

    for (const r of visibleRows.filter(
      (r): r is Row => !!r && isRowComplete(r),
    )) {
      await api.post("/scritture/", {
        esercizio: esercizioId,
        data: r.data,
        descrizione: r.descrizione,
        conto_dare: r.conto_dare.id,
        conto_avere: r.conto_avere.id,
        importo: r.importo,
      });
    }

    onSaved();
    setRows(Array.from({ length: ROWS_COUNT }, emptyRow));
    setRowErrors(Array.from({ length: ROWS_COUNT }, () => false));
    descrizioneRef.current?.focus();
  };

  const renderRow = (row: Row, i: number) => {
    const error = rowErrors[i];

    return (
      <Stack key={i} direction="row" spacing={2} alignItems="center">
        <TextField
          type="date"
          size="small"
          sx={{ width: 150 }}
          value={row.data}
          onChange={(e) =>
            updateRow(i, (r) => ({ ...r, data: e.target.value }))
          }
        />

        <TextField
          label="Descrizione"
          size="small"
          sx={{ width: 260 }}
          inputRef={i === 0 ? descrizioneRef : undefined}
          value={row.descrizione}
          onChange={(e) =>
            updateRow(i, (r) => ({
              ...r,
              descrizione: e.target.value,
            }))
          }
        />

        <Autocomplete
          size="small"
          sx={{ width: 200 }}
          options={mastrini}
          value={row.conto_dare}
          getOptionLabel={(o: any) => o?.label || o?.nome || ""}
          onChange={(_, v) => updateRow(i, (r) => ({ ...r, conto_dare: v }))}
          renderInput={(p) => (
            <TextField {...p} label="Conto Dare" error={error} />
          )}
        />

        <Autocomplete
          size="small"
          sx={{ width: 200 }}
          options={mastrini}
          value={row.conto_avere}
          getOptionLabel={(o: any) => o?.label || o?.nome || ""}
          onChange={(_, v) => updateRow(i, (r) => ({ ...r, conto_avere: v }))}
          renderInput={(p) => (
            <TextField {...p} label="Conto Avere" error={error} />
          )}
        />

        <TextField
          label="Importo"
          type="number"
          size="small"
          sx={{ width: 140 }}
          value={row.importo}
          error={error}
          onChange={(e) =>
            updateRow(i, (r) => ({ ...r, importo: e.target.value }))
          }
        />

        {i === 0 && (
          <Button type="submit" variant="contained" sx={{ px: 3, ml: 1 }}>
            Registra
          </Button>
        )}
      </Stack>
    );
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <form onSubmit={save}>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={multi}
                  onChange={(e) => setMulti(e.target.checked)}
                />
              }
              label="Multiscrittura"
            />

            {renderRow(rows[0], 0)}

            <Collapse in={multi} timeout={250}>
              <Stack spacing={2} mt={2}>
                {rows.slice(1).map((row, i) => renderRow(row, i + 1))}
              </Stack>
            </Collapse>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

// import { useRef, useState } from "react";
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
//   /**
//    * Stato del form
//    * - data inizializzata a oggi
//    * - conti null per forzare selezione esplicita
//    */
//   const [form, setForm] = useState({
//     data: new Date().toISOString().split("T")[0],
//     descrizione: "",
//     conto_dare: null as any,
//     conto_avere: null as any,
//     importo: "",
//   });

//   /**
//    * Refs per gestione focus progressivo
//    * Permette una compilazione rapida solo da tastiera
//    */
//   const descrizioneRef = useRef<HTMLInputElement>(null);
//   const dareRef = useRef<HTMLInputElement>(null);
//   const avereRef = useRef<HTMLInputElement>(null);
//   const importoRef = useRef<HTMLInputElement>(null);

//   /**
//    * Validazione UX:
//    * impedisce che Dare e Avere siano lo stesso conto
//    */
//   const sameAccount =
//     form.conto_dare &&
//     form.conto_avere &&
//     form.conto_dare.id === form.conto_avere.id;

//   /**
//    * Salvataggio scrittura
//    * - bloccato se mancano dati obbligatori
//    * - bloccato se Dare === Avere
//    * - reset parziale del form per inserimenti seriali
//    */
//   const save = async (e?: any) => {
//     e?.preventDefault();

//     if (!form.conto_dare || !form.conto_avere || !form.importo || sameAccount)
//       return;

//     await api.post("/scritture/", {
//       esercizio: esercizioId,
//       data: form.data,
//       descrizione: form.descrizione,
//       conto_dare: form.conto_dare.id,
//       conto_avere: form.conto_avere.id,
//       importo: form.importo,
//     });

//     onSaved();

//     // Reset mirato: manteniamo data e focus per inserimento rapido
//     setForm((f) => ({
//       ...f,
//       descrizione: "",
//       importo: "",
//       conto_dare: null,
//       conto_avere: null,
//     }));

//     // UX: dopo il salvataggio si riparte subito dalla descrizione
//     descrizioneRef.current?.focus();
//   };

//   return (
//     <Card elevation={2}>
//       <CardContent>
//         <form onSubmit={save}>
//           <Stack direction="row" spacing={2} alignItems="center">
//             {/*
//               Data
//               - Enter sposta il focus sulla descrizione
//             */}
//             <TextField
//               type="date"
//               label="Data"
//               InputLabelProps={{ shrink: true }}
//               size="small"
//               sx={{ width: 150 }}
//               value={form.data}
//               onChange={(e) => setForm({ ...form, data: e.target.value })}
//               onKeyDown={(e) =>
//                 e.key === "Enter" && descrizioneRef.current?.focus()
//               }
//             />

//             {/*
//               Descrizione
//               - Campo libero
//               - Enter porta al conto Dare
//             */}
//             <TextField
//               label="Descrizione"
//               size="small"
//               sx={{ width: 250 }}
//               inputRef={descrizioneRef}
//               value={form.descrizione}
//               onChange={(e) =>
//                 setForm({ ...form, descrizione: e.target.value })
//               }
//               onKeyDown={(e) => e.key === "Enter" && dareRef.current?.focus()}
//             />

//             {/*
//               Conto Dare
//               Feature UX:
//               - autoHighlight: primo risultato evidenziato
//               - Enter seleziona subito il primo conto
//               - Dopo la selezione focus automatico su Avere
//             */}
//             <Autocomplete
//               autoHighlight
//               size="small"
//               sx={{ width: 200 }}
//               options={mastrini}
//               getOptionLabel={(o: any) => o.label || o.nome || ""}
//               value={form.conto_dare}
//               onChange={(_, v) => {
//                 setForm({ ...form, conto_dare: v });
//                 avereRef.current?.focus();
//               }}
//               renderInput={(p) => (
//                 <TextField
//                   {...p}
//                   label="Conto Dare"
//                   inputRef={dareRef}
//                   error={sameAccount}
//                 />
//               )}
//             />

//             {/*
//               Conto Avere
//               Feature UX:
//               - autoHighlight come Dare
//               - Validazione immediata Dare ≠ Avere
//               - Feedback visivo tramite error + helperText
//             */}
//             <Autocomplete
//               autoHighlight
//               size="small"
//               sx={{ width: 200 }}
//               options={mastrini}
//               getOptionLabel={(o: any) => o.label || o.nome || ""}
//               value={form.conto_avere}
//               onChange={(_, v) => {
//                 setForm({ ...form, conto_avere: v });
//                 importoRef.current?.focus();
//               }}
//               renderInput={(p) => (
//                 <TextField
//                   {...p}
//                   label="Conto Avere"
//                   inputRef={avereRef}
//                   error={sameAccount}
//                   // helperText={
//                   //   sameAccount ? "Dare e Avere non possono coincidere" : ""
//                   // }
//                 />
//               )}
//             />

//             {/*
//               Importo
//               - Enter esegue il salvataggio
//               - Pensato per inserimenti rapidi consecutivi
//             */}
//             <TextField
//               label="Importo"
//               type="number"
//               size="small"
//               sx={{ width: 150 }}
//               inputRef={importoRef}
//               value={form.importo}
//               onChange={(e) => setForm({ ...form, importo: e.target.value })}
//               // onKeyDown={(e) => e.key === "Enter" && save()} ❌ rimosso onKeyDown
//             />

//             {/*
//               Pulsante Registra
//               - Disabilitato in caso di errore contabile
//             */}
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ px: 3 }}
//               disabled={sameAccount}
//             >
//               Registra
//             </Button>
//           </Stack>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
