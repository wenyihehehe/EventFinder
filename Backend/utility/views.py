from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.http import JsonResponse
from django.templatetags.static import static


from .data import CATEGORY

# Create your views here.
@api_view(("GET",))
@permission_classes([permissions.AllowAny])
def getCategory(request):
    """
    To get category data
    """
    return JsonResponse({"status": "OK", "data": CATEGORY})

# Create your views here.
@api_view(("GET",))
@permission_classes([permissions.AllowAny])
def getDefaultCoverImage(request):
    """
    To get defaultCoverImage
    """
    url = "/media/DefaultCoverImage.png"
    image = request.build_absolute_uri(url)
    return JsonResponse({"status": "OK", "data": image})