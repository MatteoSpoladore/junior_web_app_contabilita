from rest_framework import serializers
from .models import Esercizio, Mastrino, Scrittura
from django.db.models import Sum  # <--- MANCAVA QUESTA RIGA!


class EsercizioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Esercizio
        fields = ["id", "nome", "user"]
        # fields = ["id", "nome", "data_inizio", "data_fine", "user"]
        read_only_fields = ["user"]  # l'utente viene impostato dal ViewSet

    def validate_nome(self, value):
        user = self.context["request"].user
        qs = Esercizio.objects.filter(user=user, nome=value)

        # Selettore per escludere il record corrente durante una PUT/PATCH
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)

        if qs.exists():
            raise serializers.ValidationError("Hai già un esercizio con questo nome!")
        return value


class MastrinoSerializer(serializers.ModelSerializer):
    label = serializers.ReadOnlyField(source="nome")
    dare = serializers.DecimalField(
        max_digits=12, decimal_places=2, source="tot_dare", read_only=True, default=0
    )
    avere = serializers.DecimalField(
        max_digits=12, decimal_places=2, source="tot_avere", read_only=True, default=0
    )
    saldo = serializers.SerializerMethodField()

    class Meta:
        model = Mastrino
        fields = ["id", "nome", "codice", "label", "dare", "avere", "saldo"]

    # RIMOSSI get_dare e get_avere in quanto ignorati da DRF a causa della
    # dichiarazione esplicita dei DecimalField superiori.

    def get_saldo(self, obj):
        # Utilizzo del default 0 per prevenire TypeError in caso di assenza di scritture (Sum = None)
        dare = getattr(obj, "tot_dare", 0) or 0
        avere = getattr(obj, "tot_avere", 0) or 0
        return dare - avere


class ScritturaSerializer(serializers.ModelSerializer):
    conto_dare_nome = serializers.CharField(source="conto_dare.nome", read_only=True)
    conto_avere_nome = serializers.CharField(source="conto_avere.nome", read_only=True)

    # ScritturaSerializer utilizza fields = "__all__".
    # Questo permette a un utente autenticato
    # di inviare un payload POST specificando l'ID
    # di un esercizio appartenente a un altro utente.
    # Il sistema salverà la scrittura contabile
    # nel bilancio della vittima.
    class Meta:
        model = Scrittura
        fields = "__all__"

    def validate_esercizio(self, value):
        """Garantisce che l'esercizio appartenga all'utente loggato"""
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            if value.user != request.user:
                raise serializers.ValidationError(
                    "Non sei autorizzato a registrare scritture in questo esercizio."
                )
        return value

    def validate(self, data):
        # Impedisce che conto in dare e conto in avere siano identici
        if data.get("conto_dare") == data.get("conto_avere"):
            raise serializers.ValidationError(
                {
                    "conto_avere": "Il conto in Avere deve essere diverso dal conto in Dare"
                }
            )
        return data

    def validate_importo(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "L'importo della scrittura deve essere strettamente positivo."
            )
        return value
