from django.urls import path
from .views import *

urlpatterns = [
    path("getcategory/", getCategory),
    path("getdefaultcoverimage/", getDefaultCoverImage),
]