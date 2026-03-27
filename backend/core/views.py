from rest_framework import viewsets
from .models import Esercizio, Mastrino, Scrittura
from .serializers import EsercizioSerializer, MastrinoSerializer, ScritturaSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Q


class EsercizioViewSet(viewsets.ModelViewSet):
    serializer_class = EsercizioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # 1. Base: L'utente vede sempre i propri esercizi
        queryset = Esercizio.objects.filter(user=user)

        # 2. Pass Speciale: Se è prof, può vedere anche gli esercizi dei suoi alunni
        if hasattr(user, "profilo") and user.profilo.is_professore:
            studenti_ids = user.profilo.studenti.values_list("id", flat=True)
            queryset = Esercizio.objects.filter(
                Q(user=user) | Q(user_id__in=studenti_ids)
            )

        # 3. Filtro richiesto dal frontend per vedere un singolo alunno
        alunno_id = self.request.query_params.get("alunno_id")
        if alunno_id:
            queryset = queryset.filter(user_id=alunno_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MastrinoViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MastrinoSerializer

    def get_queryset(self):
        queryset = Mastrino.objects.all()
        esercizio_id = self.request.query_params.get("esercizio")

        if esercizio_id:
            user = self.request.user
            esercizio = Esercizio.objects.filter(id=esercizio_id).first()

            if not esercizio:
                return Mastrino.objects.none()

            # Controllo di sicurezza incrociato
            is_owner = esercizio.user == user
            is_prof_of_owner = (
                hasattr(user, "profilo")
                and user.profilo.is_professore
                and user.profilo.studenti.filter(id=esercizio.user_id).exists()
            )

            if not (is_owner or is_prof_of_owner):
                return Mastrino.objects.none()

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Stessa logica: unisce le scritture proprie con quelle degli alunni (se prof)
        if hasattr(user, "profilo") and user.profilo.is_professore:
            studenti_ids = user.profilo.studenti.values_list("id", flat=True)
            queryset = Scrittura.objects.select_related(
                "esercizio", "conto_dare", "conto_avere"
            ).filter(Q(esercizio__user=user) | Q(esercizio__user_id__in=studenti_ids))
        else:
            queryset = Scrittura.objects.select_related(
                "esercizio", "conto_dare", "conto_avere"
            ).filter(esercizio__user=user)

        esercizio_id = self.request.query_params.get("esercizio")
        if esercizio_id:
            queryset = queryset.filter(esercizio_id=esercizio_id)
        return queryset
