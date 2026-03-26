from rest_framework import viewsets
from .models import Esercizio, Mastrino, Scrittura
from .serializers import (
    EsercizioSerializer,
    MastrinoSerializer,
    ScritturaSerializer,
)
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Q


class EsercizioViewSet(viewsets.ModelViewSet):
    serializer_class = EsercizioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Esercizio.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MastrinoViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MastrinoSerializer

    # nuovo
    def get_queryset(self):
        queryset = Mastrino.objects.all()
        esercizio_id = self.request.query_params.get("esercizio")

        if esercizio_id:
            # Verifica che l'esrcizio esista e sia dell'utente loggato
            if not Esercizio.objects.filter(
                id=esercizio_id, user=self.request.user
            ).exists():
                return (
                    Mastrino.objects.none()
                )  # ritorna vuoto se accesso non autorizzato
            queryset = queryset.annotate(
                tot_dare=Sum(
                    "movimenti_dare__importo",
                    filter=Q(movimenti_dare__esercizio_id=esercizio_id),
                ),
                tot_avere=Sum(
                    "movimenti_avere__importo",
                    filter=Q(movimenti_avere__esercizio_id=esercizio_id),
                ),
            )
        return queryset


class ScritturaViewSet(viewsets.ModelViewSet):

    serializer_class = ScritturaSerializer
    permission_classes = [IsAuthenticated]  # blocco per solo se sei autenticato

    def get_queryset(self):
        queryset = Scrittura.objects.select_related(
            "esercizio", "conto_dare", "conto_avere"
        ).filter(esercizio__user=self.request.user)
        esercizio_id = self.request.query_params.get("esercizio")
        if esercizio_id:
            queryset = queryset.filter(esercizio_id=esercizio_id)
        return queryset
