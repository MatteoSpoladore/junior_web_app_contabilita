from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import (
    EsercizioViewSet,
    MastrinoViewSet,
    ScritturaViewSet,
)  # Verifica i tuoi import


urlpatterns = [
    path("admin/", admin.site.urls),
    # Questo crea /api/esercizi/, /api/mastrini/, ecc.
    path("api/", include("core.urls")),
    path("api/auth/", include("accounts.urls")),
]
