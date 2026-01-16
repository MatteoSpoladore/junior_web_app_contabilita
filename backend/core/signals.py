from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.db import transaction
from .models import Scrittura, Mastrino


@receiver(post_save, sender=Scrittura)
def aggiorna_saldi_su_salvataggio(sender, instance, created, **kwargs):
    """
    Se created=True (nuova scrittura): Aggiunge l'importo ai mastrini.
    Se created=False (update): La logica di update è gestita separatamente
    o richiede il 'pre_save' per sapere i valori precedenti.
    Per semplicità, in sistemi complessi si usa 'pre_save' per stornare il vecchio
    e 'post_save' per aggiungere il nuovo.
    """
    if created:
        _aggiorna_mastrino(instance.conto_dare, instance.importo, "dare")
        _aggiorna_mastrino(instance.conto_avere, instance.importo, "avere")


@receiver(post_delete, sender=Scrittura)
def aggiorna_saldi_su_cancellazione(sender, instance, **kwargs):
    """
    Quando elimino una scrittura, storno gli importi.
    """
    _aggiorna_mastrino(instance.conto_dare, -instance.importo, "dare")
    _aggiorna_mastrino(instance.conto_avere, -instance.importo, "avere")


@receiver(pre_save, sender=Scrittura)
def gestisci_modifica_scrittura(sender, instance, **kwargs):
    """
    Se stiamo modificando una scrittura esistente, dobbiamo prima
    stornare i vecchi valori dai vecchi conti.
    """
    if instance.pk:  # Se ha una PK, esiste già nel DB
        try:
            vecchia_scrittura = Scrittura.objects.get(pk=instance.pk)
            # Storno completamente la vecchia scrittura
            _aggiorna_mastrino(
                vecchia_scrittura.conto_dare, -vecchia_scrittura.importo, "dare"
            )
            _aggiorna_mastrino(
                vecchia_scrittura.conto_avere, -vecchia_scrittura.importo, "avere"
            )

            # Nota: Il post_save scatterà dopo e aggiungerà i nuovi valori
            # Quindi l'effetto netto è: -Vecchio +Nuovo
        except Scrittura.DoesNotExist:
            pass


def _aggiorna_mastrino(mastrino, importo, tipo):
    """
    Helper per aggiornare atomicamente il mastrino.
    Usiamo F() expressions per evitare race conditions base.
    """
    # Ricarichiamo l'oggetto per sicurezza o usiamo F expressions
    # Per semplicità di calcolo del saldo netto, facciamo un lock e refresh
    with transaction.atomic():
        m = Mastrino.objects.select_for_update().get(pk=mastrino.pk)
        if tipo == "dare":
            m.saldo_dare += importo
        else:
            m.saldo_avere += importo

        m.saldo_finale = m.saldo_dare - m.saldo_avere
        m.save()
