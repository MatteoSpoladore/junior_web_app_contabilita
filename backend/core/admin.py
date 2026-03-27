from django.contrib import admin
from .models import Esercizio, Scrittura, Mastrino


# Inline standard, senza pacchetti esterni
class ScritturaInline(admin.TabularInline):
    model = Scrittura
    extra = 0
    can_delete = True  # È utile poter cancellare una scrittura errata da admin


@admin.register(Esercizio)
class EsercizioAdmin(admin.ModelAdmin):
    list_display = ("nome", "user")
    list_filter = ("user",)  # Permette di filtrare lateralmente gli esercizi per utente
    search_fields = ("nome", "user__username")
    inlines = [ScritturaInline]


@admin.register(Mastrino)
class MastrinoAdmin(admin.ModelAdmin):
    list_display = ("codice", "nome")
    search_fields = ("codice", "nome")
