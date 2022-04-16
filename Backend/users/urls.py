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
    path("getuserprofileeventregistrations/", GetUserProfileEventRegistrationsView.as_view()),
    path("getregistrations/", GetRegistrationsView.as_view()),
    path("getorganizerprofileeventregistrations/", GetOrganizerProfileEventRegistrationsView.as_view()),
    path("getorganizingevent/", GetOrganizingEventView.as_view()),
    path("updateuserprofile/", UpdateUserProfileView.as_view()),
    path("updateorganizerprofile/", UpdateOrganizerProfileView.as_view()),
    path("changepassword/", ChangePasswordView.as_view()),
]