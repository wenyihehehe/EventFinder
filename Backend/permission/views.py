from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.http import JsonResponse

from users.models import Event, OrganizerProfile, Registration

# Create your views here.
@api_view(("POST",))
@permission_classes([permissions.IsAuthenticated])
def getIsRegistrationOwnerOrEventOwner(request):
    registrationId = request.data['id']
    if(not Registration.objects.filter(pk=registrationId).exists()):
        return JsonResponse({"status": "ERROR", "detail": "Registration not found"})
    registration = Registration.objects.get(pk=registrationId)
    if(registration.userId == request.user):
        return JsonResponse({"status": "OK"})
    if(not request.user.has_organizerprofile()):
        return JsonResponse({"status": "ERROR", "detail": "Organizer profile not found"})
    organizerProfile = OrganizerProfile.objects.get(userId=request.user)
    if(registration.eventId.organizerId == organizerProfile):
        return JsonResponse({"status": "OK"})
    return JsonResponse({"status": "ERROR", "detail": "Not registration owner and not organizer"})

@api_view(("GET",))
@permission_classes([permissions.IsAuthenticated])
def getHaveOrganizerProfile(request):
    if(not request.user.has_organizerprofile()):
        return JsonResponse({"status": "ERROR", "detail": "Organizer profile not found"})
    return JsonResponse({"status": "OK"})

@api_view(("POST",))
@permission_classes([permissions.IsAuthenticated])
def getHaveOrganizerProfileIsOrganizer(request):
    eventId = request.data['id']
    if(not Event.objects.filter(pk=eventId).exists()):
        return JsonResponse({"status": "ERROR", "detail": "Event not found"})
    event = Event.objects.get(pk=eventId)
    if(not request.user.has_organizerprofile()):
        return JsonResponse({"status": "ERROR", "detail": "Organizer profile not found"})
    organizerProfile = OrganizerProfile.objects.get(userId=request.user)
    if(event.organizerId == organizerProfile):
        return JsonResponse({"status": "OK"})
    return JsonResponse({"status": "ERROR", "detail": "Not organizer"})
