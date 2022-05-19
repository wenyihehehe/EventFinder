from django.urls import path
from .views import *

urlpatterns = [
    path("getisregistrationowneroreventowner/", getIsRegistrationOwnerOrEventOwner),
    path("gethaveorganizerprofile/", getHaveOrganizerProfile),
    path("gethaveorganizerprofileisorganizer/", getHaveOrganizerProfileIsOrganizer),
]