from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from .permissions import *
from .models import *
from .serializers import *

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [UserProfilePermission]

    def partial_update(self, request, pk=None):
        user = self.get_object()
        serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({"status": "ERROR", "detail": "Unable to update record"})
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

    def create(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {"status": "ERROR", "detail": serializer.errors}
            )
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({"status": "OK", "data": serializer.data, "token": token.key})

class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def create(self, request):
        address = Address.objects.filter(userId=request.data['userId']).first()
        print(address)
        if(address):
            serializer = self.get_serializer(address, data=request.data)
        else: 
            serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {"status": "ERROR", "detail": "Unable to update/create address"}
            )
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

class OrganizerProfileViewSet(ModelViewSet):
    queryset = OrganizerProfile.objects.all()
    serializer_class = OrganizerProfileSerializer
    permission_classes = [OrganizerProfilePermission]

    def partial_update(self, request, pk=None):
        organizerProfile = self.get_object()
        serializer = OrganizerProfileUpdateSerializer(organizerProfile, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({"status": "ERROR", "detail": "Unable to update record"})
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

    def create(self, request):
        request.data['userId'] = request.user.id
        if(OrganizerProfile.objects.filter(userId=request.user.id).first()):
            return Response({"status": "ERROR", "detail": "Organizer profile exists for this user"})
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {"status": "ERROR", "detail": "Unable to create record"}
            )
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [EventPermission]

    def partial_update(self, request, pk=None):
        event = self.get_object()
        serializer = EventUpdateSerializer(event, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({"status": "ERROR", "detail": "Unable to update record"})
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

class TicketTypeViewSet(ModelViewSet):
    queryset = TicketType.objects.all()
    serializer_class = TicketTypeSerializer

class RegistrationViewSet(ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

class TicketViewSet(ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        organizerProfile = OrganizerProfile.objects.get(userId=self.request.user)
        events = Event.objects.filter(organizerId=organizerProfile).values_list('id', flat=True)
        queryset = Review.objects.filter(eventId__in=events)
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = GetOrganizerReviewsSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

class GetUserProfileView(APIView):
    def get(self, request):
        user = User.objects.filter(pk=request.user.id)
        serializer = GetUserProfileSerializer(instance=user, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetRegistrationsView(APIView):
    def get(self, request):
        registrations = Registration.objects.filter(userId=request.user.id)
        serializer = GetRegistrationsSerializer(instance=registrations, many=True, context={"request": request})
        return Response({"data": serializer.data})
    
class GetOrganizerProfileView(APIView):
    def get(self, request):
        user = OrganizerProfile.objects.filter(userId=request.user.id)
        serializer = GetOrganizerProfileSerializer(instance=user, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetOrganizingEventView(APIView):
    def get(self, request):
        organizerProfile = OrganizerProfile.objects.get(userId=request.user)
        event = Event.objects.filter(organizerId=organizerProfile)
        serializer = GetOrganizingEventsSerializer(instance=event, many=True, context={"request": request})
        return Response({"data": serializer.data})
