from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r"user", UserViewSet, basename="user")
# router.register(r"address", AddressViewSet, basename="address")
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
    path("getorganizerprofileeventreviews/", GetOrganizerProfileEventReviewsView.as_view()),
    path("getorganizingevent/", GetOrganizingEventView.as_view()),
    path("updateuserprofile/", UpdateUserProfileView.as_view()),
    path("updateorganizerprofile/", UpdateOrganizerProfileView.as_view()),
    path("changepassword/", ChangePasswordView.as_view()),
    path("deleteevent/", DeleteEventView.as_view()),
    path("getorganizingeventsearchpage/", GetOrganizingEventSearchPageView.as_view()),
    path("createupdateeventimage/", CreateUpdateEventImage.as_view()),
    path(r"geteventdashboard/<int:pk>", GetEventDashboardView.as_view()),
    path(r"gettickettypestatus/<int:pk>", GetTicketTypeStatusView.as_view()),
    path("geteventregistrations/", GetEventRegistrationsView.as_view()),
    path("geteventregistration/", GetEventRegistrationView.as_view()),
    path("geteventattendeessearchpage/", GetEventAttendeesSearchPageView.as_view()),
    path(r"geteventperformance/<int:pk>", GetEventPerformanceView.as_view()),
    path(r"geteventpage/<int:pk>", GetEventPageView.as_view()),
    path(r"getrelatedevents/<int:pk>", GetRelatedEventsView.as_view()),
    path(r"geteventtickettype/<int:pk>", GetEventTicketTypeView.as_view()),
    path("getorganizedeventreviews", GetOrganizedReviewView.as_view()),
    path("geteventsearchpage/", GetEventSearchPageView.as_view()),

    path("getorganizerprofileeventreviewsnoauth/", GetOrganizerProfileEventReviewsNoAuthView.as_view()),
    path("getorganizingeventnoauth/", GetOrganizingEventNoAuthView.as_view()),
    path("getorganizedeventreviewsnoauth/", GetOrganizedReviewNoAuthView.as_view()),

    path("reset-password/", include('django_rest_passwordreset.urls', namespace='reset-password')),
    path("reset-password-custom/", ResetPasswordCustomView.as_view(), name='reset-password-custom'),
]