from django.db import models
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User


class Esercizio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="esercizi")
    nome = models.CharField(max_length=100)  # rimuovi unique=True
    # data_inizio = models.DateField()
    # data_fine = models.DateField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "nome"], name="unique_esercizio_per_utente"
            )
        ]

    def __str__(self):
        return self.nome


class Mastrino(models.Model):
    codice = models.CharField(max_length=20, unique=True)
    nome = models.CharField(max_length=200)

    # Saldi denormalizzati (aggiornati via Signals)
    saldo_dare = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    saldo_avere = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    # Questo è la differenza calcolata (utile per filtri veloci)
    saldo_finale = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    class Meta:
        ordering = ["codice"]

    def __str__(self):
        return f"{self.codice} - {self.nome}"

    def ricalcola_saldo_netto(self):
        """Metodo helper per aggiornare il netto"""
        self.saldo_finale = self.saldo_dare - self.saldo_avere
        # Nota: Non chiamiamo save() qui per evitare ricorsioni se non necessario,
        # ma lo gestiremo nel signal.


class Scrittura(models.Model):
    esercizio = models.ForeignKey(
        Esercizio, on_delete=models.CASCADE, related_name="scritture"
    )
    data = models.DateField()
    descrizione = models.CharField(max_length=255)

    # Relazioni con i Mastrini
    conto_dare = models.ForeignKey(
        Mastrino, on_delete=models.PROTECT, related_name="movimenti_dare"
    )
    conto_avere = models.ForeignKey(
        Mastrino, on_delete=models.PROTECT, related_name="movimenti_avere"
    )

    importo = models.DecimalField(max_digits=12, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-data", "-created_at"]

    def __str__(self):
        return f"{self.data} - {self.descrizione}"
