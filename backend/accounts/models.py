from django.db import models
from django.contrib.auth.models import User


class Profilo(models.Model):
    # Collega questo profilo all'utente standard di Django
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profilo")

    # Flag per distinguere il ruolo
    is_professore = models.BooleanField(default=False, verbose_name="È un Professore?")

    # Relazione Molti-a-Molti: un prof può avere tanti studenti, e viceversa
    studenti = models.ManyToManyField(
        User, related_name="professori", blank=True, verbose_name="Alunni Assegnati"
    )

    class Meta:
        verbose_name = "Profilo Utente"
        verbose_name_plural = "Profili Utenti"

    def __str__(self):
        ruolo = "Professore" if self.is_professore else "Studente"
        return f"{self.user.username} ({ruolo})"
