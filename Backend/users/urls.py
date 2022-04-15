from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r"user", UserViewSet, basename="user")
router.register(r"address", AddressViewSet, basename="address")
router.register(r"organizerprofile", OrganizerProfileViewSet, basename="organizerProfile")
router.register(r"event", EventViewSet, basename="event")
router.register(r"tickettype", TicketTypeViewSet, basename="ticketType")
router.register(r"registration", RegistrationViewSet, basename="registration")
router.register(r"ticket", TicketViewSet, basename="ticket")
router.register(r"review", ReviewViewSet, basename="review")

urlpatterns = [
    path("",include(router.urls)),
    path("getuserprofile/", GetUserProfileView.as_view()),
    path("getregistrations/", GetRegistrationsView.as_view()),
    path("getorganizerprofile/", GetOrganizerProfileView.as_view()),
    path("getorganizingevent/", GetOrganizingEventView.as_view()),
]