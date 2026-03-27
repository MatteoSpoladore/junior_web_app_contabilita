from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profilo


@receiver(post_save, sender=User)
def crea_profilo_utente(sender, instance, created, **kwargs):
    """Crea automaticamente un Profilo vuoto ogni volta che viene creato un nuovo User"""
    if created:
        Profilo.objects.create(user=instance)


@receiver(post_save, sender=User)
def salva_profilo_utente(sender, instance, **kwargs):
    """Assicura che il profilo venga salvato se l'utente viene aggiornato"""
    instance.profilo.save()
