from django.core.management.base import BaseCommand
from core.models import Mastrino


class Command(BaseCommand):
    help = "Inizializza il piano dei conti standard"

    def handle(self, *args, **kwargs):
        conti = conti = [
            # ==================================================
            # ATTIVO
            # ==================================================
            # Disponibilità liquide
            ("10.10", "Cassa"),
            ("10.20", "Banca c/c"),
            # ("10.30", "Carte di credito"),
            ("10.40", "Assegni"),
            ("10.50", "Cambiali attive"),
            # ("10.60", "Cassa assegni"),
            # Crediti commerciali
            ("20.10", "Crediti v/Clienti"),
            ("20.20", "Clienti c/fatture da emettere"),
            ("20.30", "Fondo svalutazione crediti"),
            # Altri crediti
            # ("25.10", "Crediti verso dipendenti"),
            ("25.20", "Crediti verso erario"),
            # ("25.30", "Crediti verso INPS"),
            ("25.40", "Altri crediti"),
            # Magazzino
            ("30.10", "Merci c/magazzino"),
            ("30.20", "Rimanenze finali merci"),
            ("30.30", "Materie prime"),
            ("30.40", "Prodotti finiti"),
            ("30.50", "Semilavorati"),
            # Immobilizzazioni materiali (valore lordo)
            ("35.10", "Impianti e macchinari"),
            ("35.11", "Attrezzature industriali e commerciali"),
            ("35.12", "Mobili e arredi"),
            ("35.13", "Automezzi"),
            ("35.14", "Hardware"),
            ("35.15", "Altri beni materiali"),
            # Fondi ammortamento immobilizzazioni materiali
            ("35.90", "Fondo ammortamento impianti e macchinari"),
            ("35.91", "Fondo ammortamento attrezzature industriali e commerciali"),
            ("35.92", "Fondo ammortamento mobili e arredi"),
            ("35.93", "Fondo ammortamento automezzi"),
            ("35.94", "Fondo ammortamento hardware"),
            ("35.95", "Fondo ammortamento altri beni materiali"),
            # Immobilizzazioni immateriali (valore lordo)
            ("36.10", "Software"),
            ("36.11", "Marchi e brevetti"),
            ("36.12", "Costi di impianto e ampliamento"),
            ("36.13", "Avviamento"),
            # Fondi ammortamento immobilizzazioni immateriali
            ("36.90", "Fondo ammortamento software"),
            ("36.91", "Fondo ammortamento marchi e brevetti"),
            ("36.92", "Fondo ammortamento costi di impianto e ampliamento"),
            ("36.93", "Fondo ammortamento avviamento"),
            # IVA e imposte
            ("40.10", "IVA a credito"),
            # ("40.20", "IVA su acquisti intracomunitari"),
            # Ratei e risconti attivi
            ("45.10", "Ratei attivi"),
            ("45.20", "Risconti attivi"),
            # ==================================================
            # PASSIVO
            # ==================================================
            # Debiti verso fornitori
            ("50.10", "Debiti v/Fornitori"),
            ("50.20", "Fornitori c/fatture da ricevere"),
            # Debiti verso personale
            # ("55.10", "Debiti verso dipendenti"),
            # ("55.20", "Debiti verso amministratori"),
            # Debiti tributari e previdenziali
            ("60.10", "Debiti tributari"),
            ("60.11", "Debiti per IRES"),
            ("60.12", "Debiti per IRAP"),
            ("60.13", "Debiti per ritenute da versare"),
            ("60.20", "IVA a debito"),
            # ("60.30", "Debiti verso INPS"),
            # ("60.40", "Debiti verso INAIL"),
            # Altri debiti
            ("65.10", "Debiti verso altri enti"),
            ("65.20", "Debiti verso assicurazioni"),
            # Debiti finanziari
            ("70.10", "Mutui passivi"),
            # ("70.20", "Finanziamenti bancari"),
            ("70.30", "Debiti verso soci"),
            # Ratei, risconti e fondi
            ("75.10", "Ratei passivi"),
            ("75.20", "Risconti passivi"),
            ("75.30", "Fondi rischi e oneri"),
            # ==================================================
            # PATRIMONIO NETTO
            # ==================================================
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
            # ==================================================
            # COSTI
            # ==================================================
            # Costi operativi
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
            # Costi del personale
            ("91.10", "Stipendi e salari"),
            ("91.20", "Contributi previdenziali"),
            ("91.30", "TFR"),
            ("91.40", "Premi INAIL"),
            # Ammortamenti materiali
            ("92.11", "Ammortamento impianti e macchinari"),
            ("92.12", "Ammortamento attrezzature industriali e commerciali"),
            ("92.13", "Ammortamento mobili e arredi"),
            ("92.14", "Ammortamento automezzi"),
            ("92.15", "Ammortamento hardware"),
            ("92.16", "Ammortamento altri beni materiali"),
            # Ammortamenti immateriali
            ("92.21", "Ammortamento software"),
            ("92.22", "Ammortamento marchi e brevetti"),
            ("92.23", "Ammortamento costi di impianto e ampliamento"),
            ("92.24", "Ammortamento avviamento"),
            # Accantonamenti e imposte
            ("92.30", "Svalutazione crediti"),
            ("92.31", "Perdite su crediti"),
            ("93.10", "Imposte sul reddito"),
            ("93.20", "IRES"),
            ("93.30", "IRAP"),
            # ==================================================
            # RICAVI
            # ==================================================
            ("95.10", "Merci c/vendite"),
            ("95.20", "Ricavi da prestazioni di servizi"),
            ("95.30", "Abbuoni e sconti attivi"),
            ("95.40", "Altri ricavi e proventi"),
            ("95.50", "Interessi attivi"),
        ]

        for cod, nome in conti:
            Mastrino.objects.get_or_create(codice=cod, defaults={"nome": nome})

        self.stdout.write(self.style.SUCCESS("Conti inizializzati!"))
