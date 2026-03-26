from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import RegisterSerializer, CustomTokenSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


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
                {"detail": "Logout effettuato con successo."}, status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            return Response(
                {"detail": "Token non valido o già revocato"}, status=status.HTTP_400_BAD_REQUEST
            )
