from django.contrib import admin
from .models import Esercizio, Mastrino, Operazione, RigaOperazione


# 1. Inline per le singole righe Dare/Avere
class RigaOperazioneInline(admin.TabularInline):
    model = RigaOperazione
    extra = 2  # Ne prepariamo 2 di default (perfetto per Dare e Avere)
    can_delete = True


# 2. Admin per l'Operazione (la Testata)
@admin.register(Operazione)
class OperazioneAdmin(admin.ModelAdmin):
    list_display = ("data", "descrizione", "esercizio")
    list_filter = ("esercizio__user", "esercizio", "data")
    search_fields = ("descrizione", "esercizio__nome")
    inlines = [RigaOperazioneInline]  # Includiamo le righe qui dentro


# 3. Inline per le Operazioni dentro l'Esercizio
class OperazioneInline(admin.TabularInline):
    model = Operazione
    extra = 0
    can_delete = True
    show_change_link = True  # <-- TRUCCO UX: Aggiunge un bottoncino per aprire il dettaglio dell'operazione e vedere le sue righe


# 4. Admin per l'Esercizio
@admin.register(Esercizio)
class EsercizioAdmin(admin.ModelAdmin):
    list_display = ("nome", "user")
    list_filter = ("user",)
    search_fields = ("nome", "user__username")
    inlines = [OperazioneInline]


# 5. Admin per il Mastrino
@admin.register(Mastrino)
class MastrinoAdmin(admin.ModelAdmin):
    list_display = ("codice", "nome")
    search_fields = ("codice", "nome")
