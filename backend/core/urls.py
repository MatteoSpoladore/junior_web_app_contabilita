from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import EsercizioViewSet, MastrinoViewSet, ScritturaViewSet

router = DefaultRouter()
router.register(r"esercizi", EsercizioViewSet, basename="esercizi")
router.register(r"mastrini", MastrinoViewSet)
router.register(r"scritture", ScritturaViewSet)

urlpatterns = [
    path("", include(router.urls)),  # solo le API dell'app
]
