from rest_framework import serializers
from .models import Esercizio, Mastrino, Scrittura
from django.db.models import Sum  # <--- MANCAVA QUESTA RIGA!


class EsercizioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Esercizio
        fields = ["id", "nome", "user"]
        # fields = ["id", "nome", "data_inizio", "data_fine", "user"]
        read_only_fields = ["user"]  # l'utente viene impostato dal ViewSet

    # Validazione custom sul nome
    def validate_nome(self, value):
        user = self.context["request"].user  # prendi l'utente dalla request
        # Controlla se esiste già un esercizio con lo stesso nome per questo utente
        if Esercizio.objects.filter(user=user, nome=value).exists():
            raise serializers.ValidationError("Hai già un esercizio con questo nome!")
        return value


class MastrinoSerializer(serializers.ModelSerializer):
    dare = serializers.SerializerMethodField()
    avere = serializers.SerializerMethodField()
    saldo = serializers.SerializerMethodField()
    label = serializers.ReadOnlyField(source="nome")

    class Meta:
        model = Mastrino
        fields = ["id", "nome", "codice", "label", "dare", "avere", "saldo"]

    def get_dare(self, obj):
        # Recuperiamo l'esercizio dai parametri della richiesta (se presente)
        esercizio_id = self.context.get("request").query_params.get("esercizio")
        filtrazione = Scrittura.objects.filter(conto_dare=obj)

        if esercizio_id:
            filtrazione = filtrazione.filter(esercizio_id=esercizio_id)

        res = filtrazione.aggregate(Sum("importo"))
        return res["importo__sum"] or 0

    def get_avere(self, obj):
        esercizio_id = self.context.get("request").query_params.get("esercizio")
        filtrazione = Scrittura.objects.filter(conto_avere=obj)

        if esercizio_id:
            filtrazione = filtrazione.filter(esercizio_id=esercizio_id)

        res = filtrazione.aggregate(Sum("importo"))
        return res["importo__sum"] or 0

    def get_saldo(self, obj):
        return self.get_dare(obj) - self.get_avere(obj)


class ScritturaSerializer(serializers.ModelSerializer):
    conto_dare_nome = serializers.CharField(source="conto_dare.nome", read_only=True)
    conto_avere_nome = serializers.CharField(source="conto_avere.nome", read_only=True)

    class Meta:
        model = Scrittura
        fields = "__all__"
