    from django.core.management.base import BaseCommand
    from django.contrib.auth.models import User
    from core.models import Mastrino, Esercizio, Operazione, RigaOperazione
    from datetime import date


    class Command(BaseCommand):
        help = "Inizializza piano dei conti, utenti di test e scritture di esempio"

        def handle(self, *args, **kwargs):
            # ==================================================
            # 1. INIZIALIZZAZIONE PIANO DEI CONTI
            # ==================================================
            conti = [
                # ATTIVO
                ("10.10", "Cassa"),
                ("10.20", "Banca c/c"),
                ("10.40", "Assegni"),
                ("10.50", "Cambiali attive"),
                ("20.10", "Crediti v/Clienti"),
                ("20.20", "Clienti c/fatture da emettere"),
                ("20.30", "Fondo svalutazione crediti"),
                ("25.20", "Crediti verso erario"),
                ("25.40", "Altri crediti"),
                ("30.10", "Merci c/magazzino"),
                ("30.20", "Rimanenze finali merci"),
                ("30.30", "Materie prime"),
                ("30.40", "Prodotti finiti"),
                ("30.50", "Semilavorati"),
                ("35.10", "Impianti e macchinari"),
                ("35.11", "Attrezzature industriali e commerciali"),
                ("35.12", "Mobili e arredi"),
                ("35.13", "Automezzi"),
                ("35.14", "Hardware"),
                ("35.15", "Altri beni materiali"),
                ("35.90", "Fondo ammortamento impianti e macchinari"),
                ("35.91", "Fondo ammortamento attrezzature industriali e commerciali"),
                ("35.92", "Fondo ammortamento mobili e arredi"),
                ("35.93", "Fondo ammortamento automezzi"),
                ("35.94", "Fondo ammortamento hardware"),
                ("35.95", "Fondo ammortamento altri beni materiali"),
                ("36.10", "Software"),
                ("36.11", "Marchi e brevetti"),
                ("36.12", "Costi di impianto e ampliamento"),
                ("36.13", "Avviamento"),
                ("36.90", "Fondo ammortamento software"),
                ("36.91", "Fondo ammortamento marchi e brevetti"),
                ("36.92", "Fondo ammortamento costi di impianto e ampliamento"),
                ("36.93", "Fondo ammortamento avviamento"),
                ("40.10", "IVA a credito"),
                ("45.10", "Ratei attivi"),
                ("45.20", "Risconti attivi"),
                # PASSIVO
                ("50.10", "Debiti v/Fornitori"),
                ("50.20", "Fornitori c/fatture da ricevere"),
                ("60.10", "Debiti tributari"),
                ("60.11", "Debiti per IRES"),
                ("60.12", "Debiti per IRAP"),
                ("60.13", "Debiti per ritenute da versare"),
                ("60.20", "IVA a debito"),
                ("65.10", "Debiti verso altri enti"),
                ("65.20", "Debiti verso assicurazioni"),
                ("70.10", "Mutui passivi"),
                ("70.30", "Debiti verso soci"),
                ("75.10", "Ratei passivi"),
                ("75.20", "Risconti passivi"),
                ("75.30", "Fondi rischi e oneri"),
                # PATRIMONIO NETTO
                ("80.10", "Capitale sociale"),
                ("80.11", "Capitale sociale sottoscritto"),
                ("80.12", "Capitale sociale versato"),
                ("80.13", "Capitale sociale da versare"),
                ("80.20", "Riserva legale"),
                ("80.21", "Riserva straordinaria"),
                ("80.22", "Riserva statutaria"),
                ("80.23", "Riserva sovrapprezzo azioni / quote"),
                ("80.30", "Utili portati a nuovo"),
                ("80.31", "Perdite portate a nuovo"),
                ("80.40", "Utile (perdita) d'esercizio"),
                # COSTI
                ("90.10", "Acquisti merci"),
                ("90.11", "Abbuoni e sconti passivi"),
                ("90.20", "Costi per servizi"),
                ("90.21", "Consulenze"),
                ("90.22", "Manutenzioni e riparazioni"),
                ("90.30", "Affitti passivi"),
                ("90.40", "Utenze"),
                ("90.50", "Spese telefoniche"),
                ("90.60", "Spese bancarie"),
                ("90.70", "Spese assicurative"),
                ("90.80", "Spese di trasporto"),
                ("90.90", "Pubblicità e marketing"),
                ("91.10", "Stipendi e salari"),
                ("91.20", "Contributi previdenziali"),
                ("91.30", "TFR"),
                ("91.40", "Premi INAIL"),
                ("92.11", "Ammortamento impianti e macchinari"),
                ("92.12", "Ammortamento attrezzature industriali e commerciali"),
                ("92.13", "Ammortamento mobili e arredi"),
                ("92.14", "Ammortamento automezzi"),
                ("92.15", "Ammortamento hardware"),
                ("92.16", "Ammortamento altri beni materiali"),
                ("92.21", "Ammortamento software"),
                ("92.22", "Ammortamento marchi e brevetti"),
                ("92.23", "Ammortamento costi di impianto e ampliamento"),
                ("92.24", "Ammortamento avviamento"),
                ("92.30", "Svalutazione crediti"),
                ("92.31", "Perdite su crediti"),
                ("93.10", "Imposte sul reddito"),
                ("93.20", "IRES"),
                ("93.30", "IRAP"),
                # RICAVI
                ("95.10", "Merci c/vendite"),
                ("95.20", "Ricavi da prestazioni di servizi"),
                ("95.30", "Abbuoni e sconti attivi"),
                ("95.40", "Altri ricavi e proventi"),
                ("95.50", "Interessi attivi"),
            ]

            for cod, nome in conti:
                Mastrino.objects.get_or_create(codice=cod, defaults={"nome": nome})
            self.stdout.write(self.style.SUCCESS("✅ Piano dei conti inizializzato!"))

            # ==================================================
            # 2. CREAZIONE UTENTI DI TEST
            # ==================================================
            # Creiamo un superuser (Admin/Professore)
            if not User.objects.filter(username="admin").exists():
                User.objects.create_superuser("admin", "admin@scuola.it", "admin")
                self.stdout.write(
                    self.style.SUCCESS("✅ Superuser creato -> User: admin | Pass: admin")
                )

            # Creiamo uno studente normale
            studente, created = User.objects.get_or_create(
                username="studente", defaults={"email": "studente@scuola.it"}
            )
            if created:
                studente.set_password("studente123")
                studente.save()
                self.stdout.write(
                    self.style.SUCCESS(
                        "✅ Utente Studente creato -> User: studente | Pass: studente123"
                    )
                )

            # ==================================================
            # 3. CREAZIONE ESERCIZIO E SCRITTURE
            # ==================================================
            esercizio, created = Esercizio.objects.get_or_create(
                nome="Esercitazione Guidata 1", user=studente
            )

            if created:
                self.stdout.write(self.style.SUCCESS("✅ Esercizio di prova creato!"))

                # Operazione 1: Acquisto merci con IVA
                op1 = Operazione.objects.create(
                    esercizio=esercizio,
                    data=date.today(),
                    descrizione="Ricevuta fattura per acquisto merci",
                )
                merci = Mastrino.objects.get(codice="90.10")
                iva = Mastrino.objects.get(codice="40.10")
                fornitori = Mastrino.objects.get(codice="50.10")

                RigaOperazione.objects.create(
                    operazione=op1, conto=merci, sezione="D", importo=1000.00
                )
                RigaOperazione.objects.create(
                    operazione=op1, conto=iva, sezione="D", importo=220.00
                )
                RigaOperazione.objects.create(
                    operazione=op1, conto=fornitori, sezione="A", importo=1220.00
                )

                # Operazione 2: Pagamento del debito a mezzo banca
                op2 = Operazione.objects.create(
                    esercizio=esercizio,
                    data=date.today(),
                    descrizione="Emesso bonifico a saldo fattura",
                )
                banca = Mastrino.objects.get(codice="10.20")

                RigaOperazione.objects.create(
                    operazione=op2, conto=fornitori, sezione="D", importo=1220.00
                )
                RigaOperazione.objects.create(
                    operazione=op2, conto=banca, sezione="A", importo=1220.00
                )

                self.stdout.write(
                    self.style.SUCCESS(
                        "✅ Scritture contabili di prova inserite con successo!"
                    )
                )
