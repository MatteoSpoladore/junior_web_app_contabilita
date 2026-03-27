# Django
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

# Django REST Framework
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

# Simple JWT
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Local imports (i tuoi)
from .serializers import (
    RegisterSerializer,
    CustomTokenSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    StudenteSerializer,
)


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer
    permission_classes = [AllowAny]  # esplicito


class RefreshTokenView(TokenRefreshView):
    permission_classes = [AllowAny]


class LogoutView(APIView):
    # Eredita IsAuthenticated dai default globali
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"detail": "Logout effettuato con successo."},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception as e:
            return Response(
                {"detail": "Token non valido o già revocato"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        user = User.objects.filter(email=email).first()

        if user:

            # Codifica l'id utente in modo sicuro per l'url
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Genera il token crittografico
            token = default_token_generator.make_token(user)

            # Costruzione Url frontend (assumendo Vite su porta 5173)
            reset_link = f"http://localhost:5173/reset-password/{uid}/{token}/"

            send_mail(
                subject="Richiesta di reset password",
                message=f"Usa questo link per resettare la tua password: {reset_link}",
                from_email="noreply@contabilia.local",
                recipient_list=[user.email],
                fail_silently=False,
            )
        # Security design: Restituire esito positivo anche se l'utente non esiste
        # impedisce a un attaccante di mappare il database (Enumeration Attack)
        return Response(
            {
                "detail": "Se l'email è registrata nei nostri sistemi, riceverai un link per il reset."
            },
            status=status.HTTP_200_OK,
        )


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uid_b64 = serializer.validated_data["uid"]
        token = serializer.validated_data["token"]
        new_password = serializer.validated_data["new_password"]

        try:
            # Decodifica l'ID utente da base64 a intero
            uid = force_bytes(urlsafe_base64_decode(uid_b64)).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        # Verifica che l'utente esista e che il token non sia scaduto o falsificato
        if user is not None and default_token_generator.check_token(user, token):
            # Imposta la nuova password (eseguendo automaticamente l'hashing)
            user.set_password(new_password)
            user.save()
            return Response(
                {"detail": "Password aggiornata con successo."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"detail": "Il link di reset è invalido o scaduto."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class StudentiAssegnatiView(ListAPIView):
    """
    Restituisce la lista degli studenti assegnati all'utente loggato.
    Se l'utente non è un professore, restituisce una lista vuota.
    """

    serializer_class = StudenteSerializer
    permission_classes = [IsAuthenticated]  # Solo gli utenti loggati possono chiamarla

    def get_queryset(self):
        user = self.request.user
        # Se l'utente ha un profilo ed è un professore, ritorna i suoi studenti
        if hasattr(user, "profilo") and user.profilo.is_professore:
            return user.profilo.studenti.all()

        # Altrimenti, barriera di sicurezza: restituisce un database vuoto
        return User.objects.none()
