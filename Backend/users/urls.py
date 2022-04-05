from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r"user", UserViewSet, basename="user")
router.register(r"address", AddressViewSet, basename="address")
router.register(r"organizerProfile", OrganizerProfileViewSet, basename="organizerProfile")
router.register(r"event", EventViewSet, basename="event")
router.register(r"ticketType", TicketTypeViewSet, basename="ticketType")
router.register(r"registration", RegistrationViewSet, basename="registration")
router.register(r"Ticket", TicketViewSet, basename="ticket")
router.register(r"review", ReviewViewSet, basename="review")

urlpatterns = [
    path("",include(router.urls))
]