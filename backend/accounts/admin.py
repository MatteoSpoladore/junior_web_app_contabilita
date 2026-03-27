from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Profilo


# Creiamo un'interfaccia "in linea" per vedere il profilo direttamente dentro l'utente
class ProfiloInline(admin.StackedInline):
    model = Profilo
    can_delete = False
    verbose_name_plural = "Gestione Ruolo e Classe"
    # filter_horizontal crea un widget a due colonne bellissimo per selezionare gli studenti
    filter_horizontal = ("studenti",)


# Estendiamo l'admin base di Django
class CustomUserAdmin(UserAdmin):
    inlines = (ProfiloInline,)
    list_display = ("username", "email", "first_name", "last_name", "get_is_professore")

    # Aggiungiamo una colonna per vedere a colpo d'occhio chi è prof
    def get_is_professore(self, instance):
        return instance.profilo.is_professore

    get_is_professore.short_description = "Professore?"
    get_is_professore.boolean = True


# Deregistriamo il vecchio admin brutto e registriamo il nuovo
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


# class ScritturaInline(nested_admin.NestedTabularInline):
#     model = Scrittura
#     extra = 0
#     can_delete = False


# # Inline per mostrare gli esercizi collegati all'utente
# class EsercizioInline(nested_admin.NestedTabularInline):
#     model = Esercizio
#     extra = 0  # non aggiunge righe vuote
#     can_delete = False
#     inlines = [
#         ScritturaInline
#     ]  # Admin non supporta direttamente inline annidati senza pacchetti esterni


# # Estendi l'admin User originale
# class UserAdmin(nested_admin.NestedModelAdmin):
#     inlines = [EsercizioInline]
#     list_display = ("username", "email", "is_staff")


# # Disregistriamo il default e registriamo il nuovo admin
# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)
