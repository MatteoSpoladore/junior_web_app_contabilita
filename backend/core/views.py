from rest_framework import viewsets
from .models import Esercizio, Mastrino, Scrittura
from .serializers import (
    EsercizioSerializer,
    MastrinoSerializer,
    ScritturaSerializer,
)
from rest_framework.permissions import IsAuthenticated


class EsercizioViewSet(viewsets.ModelViewSet):
    serializer_class = EsercizioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Esercizio.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MastrinoViewSet(viewsets.ModelViewSet):
    queryset = Mastrino.objects.all()
    serializer_class = MastrinoSerializer


class ScritturaViewSet(viewsets.ModelViewSet):
    queryset = Scrittura.objects.all()
    serializer_class = ScritturaSerializer

    def get_queryset(self):
        queryset = Scrittura.objects.all()
        esercizio_id = self.request.query_params.get("esercizio")
        if esercizio_id:
            queryset = queryset.filter(esercizio_id=esercizio_id)
        return queryset
