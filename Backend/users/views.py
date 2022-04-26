from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated 
from rest_framework import filters

from .permissions import *
from .models import *
from .serializers import *
from .pagination import *

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [UserProfilePermission]
    
    def list(self, request, *args, **kwargs):
        queryset = User.objects.filter(id=self.request.user.id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

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

    def list(self, request, *args, **kwargs):
        queryset = Address.objects.filter(userId=request.user.id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        request.data['userId'] = request.user.id
        address = Address.objects.filter(userId=request.user.id).first()
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

    def list(self, request, *args, **kwargs):
        queryset = OrganizerProfile.objects.filter(userId=self.request.user.id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

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
    serializer_class = GetEventSerializer
    permission_classes = [EventPermission]

    def partial_update(self, request, pk=None):
        event = self.get_object()
        serializer = EventUpdateSerializer(event, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({"status": "ERROR", "detail": "Unable to update record"})
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})
    
    def create(self, request):
        data = request.data.copy()
        organizerProfile = OrganizerProfile.objects.get(userId=request.user)
        data['organizerId'] = organizerProfile.id
        if ("id" in request.data):
            instance = Event.objects.get(id=request.data["id"])
            serializer = CreateEventSerializer(instance, data=data, partial=True)
        else:
            serializer = CreateEventSerializer(data=data, partial=True)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {"status": "ERROR", "detail": "Unable to create record"}
            )
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={"request": request} )
        return Response(serializer.data)

class TicketTypeViewSet(ModelViewSet):
    queryset = TicketType.objects.all()
    serializer_class = TicketTypeSerializer

    def create(self, request):
        if ("id" in request.data):
            instance = TicketType.objects.get(id=request.data["id"])
            serializer = self.get_serializer(instance, data=request.data, partial=True)
        else:
            serializer = self.get_serializer(data=request.data, partial=True)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {"status": "ERROR", "detail": "Unable to create record"}
            )
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

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

class GetUserProfileEventRegistrationsView(APIView):
    def get(self, request):
        user = User.objects.filter(pk=request.user.id)
        serializer = GetUserProfileEventRegistrationsSerializer(instance=user, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetRegistrationsView(APIView):
    def get(self, request):
        registrations = Registration.objects.filter(userId=request.user.id)
        serializer = GetRegistrationsSerializer(instance=registrations, many=True, context={"request": request})
        return Response({"data": serializer.data})
    
class GetOrganizerProfileEventRegistrationsView(APIView):
    def get(self, request):
        user = OrganizerProfile.objects.filter(userId=request.user.id)
        serializer = GetOrganizerProfileEventRegistrationsSerializer(instance=user, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetOrganizingEventView(APIView):
    def get(self, request):
        organizerProfile = OrganizerProfile.objects.get(userId=request.user)
        event = Event.objects.filter(organizerId=organizerProfile)
        serializer = GetOrganizingEventsSerializer(instance=event, many=True, context={"request": request})
        return Response({"data": serializer.data})

class UpdateUserProfileView(APIView):
    def patch(self, request):
        user = request.user
        serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({"status": "ERROR", "detail": "Unable to update record"})
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

class UpdateOrganizerProfileView(APIView):
    def patch(self, request):
        organizerProfile = OrganizerProfile.objects.get(userId=request.user)
        serializer = OrganizerProfileUpdateSerializer(organizerProfile, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({"status": "ERROR", "detail": "Unable to update record"})
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            if not user.check_password(serializer.data.get("currentPassword")):
                return Response({"status": "ERROR", "detail": "Wrong password."})
            user.set_password(serializer.data.get("newPassword"))
            user.save()
            return Response({"status": "OK"})
        return Response({"status": "ERROR", "detail": "Unable to change password"})

class DeleteEventView(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated, EventPermission)

    def delete(self, request):
        event = Event.objects.get(id=request.data["id"])
        serializer = DeleteEventSerializer(event, data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {"status": "ERROR", "detail": "Unable to delete event"}
            )
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

class GetOrganizingEventSearchPageView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'location']
    pagination_class = BasicPagination

    def get_queryset(self):
        organizerProfile = OrganizerProfile.objects.get(userId=self.request.user)
        event = Event.objects.filter(organizerId=organizerProfile)
        return event

    def get(self, request, *args, **kwargs):
        event = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(event)
        if page is not None:
            serializer = GetOrganizingEventsSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetOrganizingEventsSerializer(instance=event, many=True, context={"request": request})
        return Response({"data": serializer.data})

class CreateUpdateEventImage(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        event = Event.objects.get(pk=int(request.data['eventId']))
        if(event.has_eventImage()):
            event.image.all().delete()
        data = []
        images= request.data.getlist('image').copy()
        for image in images:
            item = {
                'eventId': request.data['eventId'],
                'image': image
            }
            data.append(item)
        serializer = CreateEventImageSerializer(data=data, many=True)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {"status": "ERROR", "detail": "Unable to save image"}
            )
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

class GetEventDashboardView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Event.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GetEventDashboardSerializer(instance)
        return Response({"data": serializer.data})

class GetTicketTypeStatusView(APIView):
    def get(self, request, pk=None):
        ticketType = TicketType.objects.get(pk=pk)
        eventStatus = ticketType.eventId.status
        if (eventStatus != "Draft" and ticketType.has_ticketSold()):
            return Response({"canDelete": False})
        return Response({"canDelete": True})
