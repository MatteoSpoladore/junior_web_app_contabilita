from django.contrib import admin
import nested_admin
from django.contrib.auth.models import User
from core.models import Esercizio, Scrittura


class ScritturaInline(nested_admin.NestedTabularInline):
    model = Scrittura
    extra = 0
    can_delete = False


# Inline per mostrare gli esercizi collegati all'utente
class EsercizioInline(nested_admin.NestedTabularInline):
    model = Esercizio
    extra = 0  # non aggiunge righe vuote
    can_delete = False
    inlines = [
        ScritturaInline
    ]  # Admin non supporta direttamente inline annidati senza pacchetti esterni


# Estendi l'admin User originale
class UserAdmin(nested_admin.NestedModelAdmin):
    inlines = [EsercizioInline]
    list_display = ("username", "email", "is_staff")


# Disregistriamo il default e registriamo il nuovo admin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
