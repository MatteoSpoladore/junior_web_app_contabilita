from rest_framework import viewsets
from .models import Esercizio, Mastrino, Operazione, RigaOperazione
from .serializers import (
    EsercizioSerializer,
    MastrinoSerializer,
    OperazioneSerializer,
    RigaOperazioneSerializer,
)
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Q


class EsercizioViewSet(viewsets.ModelViewSet):
    serializer_class = EsercizioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # 1. Se stiamo chiedendo la lista completa (es. per la Sidebar o per la pagina Alunno)
        if self.action == "list":
            alunno_id = self.request.query_params.get("alunno_id")
            if alunno_id:
                if hasattr(user, "profilo") and user.profilo.is_professore:
                    if user.profilo.studenti.filter(id=alunno_id).exists():
                        return Esercizio.objects.filter(user_id=alunno_id)
                return Esercizio.objects.none()
            # Sidebar di default: mostra solo i miei
            return Esercizio.objects.filter(user=user)

        # 2. Se stiamo accedendo a un esercizio specifico (Retrieve, Update, Delete)
        # Il prof ha il "Pass Partout" per accedere anche a quelli degli alunni
        queryset = Esercizio.objects.filter(user=user)
        if hasattr(user, "profilo") and user.profilo.is_professore:
            studenti_ids = user.profilo.studenti.values_list("id", flat=True)
            queryset = Esercizio.objects.filter(
                Q(user=user) | Q(user_id__in=studenti_ids)
            )

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

            # --- LA MODIFICA È QUI ---
            # Ora calcoliamo i totali passando attraverso "RigaOperazione" -> "Operazione"
            queryset = queryset.annotate(
                tot_dare=Sum(
                    "movimenti__importo",
                    filter=Q(
                        movimenti__operazione__esercizio_id=esercizio_id,
                        movimenti__sezione="D",
                    ),
                ),
                tot_avere=Sum(
                    "movimenti__importo",
                    filter=Q(
                        movimenti__operazione__esercizio_id=esercizio_id,
                        movimenti__sezione="A",
                    ),
                ),
            )
        return queryset


# class ScritturaViewSet(viewsets.ModelViewSet):
#     serializer_class = ScritturaSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user

#         # Stessa logica: unisce le scritture proprie con quelle degli alunni (se prof)
#         if hasattr(user, "profilo") and user.profilo.is_professore:
#             studenti_ids = user.profilo.studenti.values_list("id", flat=True)
#             queryset = Scrittura.objects.select_related(
#                 "esercizio", "conto_dare", "conto_avere"
#             ).filter(Q(esercizio__user=user) | Q(esercizio__user_id__in=studenti_ids))
#         else:
#             queryset = Scrittura.objects.select_related(
#                 "esercizio", "conto_dare", "conto_avere"
#             ).filter(esercizio__user=user)

#         esercizio_id = self.request.query_params.get("esercizio")
#         if esercizio_id:
#             queryset = queryset.filter(esercizio_id=esercizio_id)
#         return queryset


class OperazioneViewSet(viewsets.ModelViewSet):
    serializer_class = OperazioneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        queryset = Operazione.objects.prefetch_related("righe__conto").select_related(
            "esercizio"
        )

        if hasattr(user, "profilo") and user.profilo.is_professore:
            studenti_ids = user.profilo.studenti.values_list("id", flat=True)
            queryset = queryset.filter(
                Q(esercizio__user=user) | Q(esercizio__user_id__in=studenti_ids)
            )
        else:
            queryset = queryset.filter(esercizio__user=user)

        esercizio_id = self.request.query_params.get("esercizio")
        if esercizio_id:
            queryset = queryset.filter(esercizio_id=esercizio_id)

        return queryset
