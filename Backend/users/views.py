from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters

from django.db.models import Q
from django.utils import timezone

from .permissions import *
from .models import *
from .serializers import *
from .pagination import *
from .mailFunction import *

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
        sendNewUserEmail(user)
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
        data = request.data.copy()
        data['userId'] = request.user.id
        if(OrganizerProfile.objects.filter(userId=request.user.id).first()):
            return Response({"status": "ERROR", "detail": "Organizer profile exists for this user"})
        serializer = self.get_serializer(data=data)
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
    pagination_class = ExtraSmallPagination

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
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(status='Published').order_by('-eventpagevisit__visits')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = GetRelatedEventsSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetRelatedEventsSerializer(queryset, many=True, context={"request": request})
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

    def create(self, request):
        data = request.data.copy()
        data['userId'] = request.user.id
        orders = data['orders']
        for order in orders:
            ticketType = TicketType.objects.get(pk=order["id"])
            if (int(ticketType.quantity) - int(order["quantity"]) < 0):
                return Response(
                    {"status": "ERROR", "detail": "Insufficient ticket quantity for %s" % (ticketType.name)}
                ) 
        serializer = self.get_serializer(data=data, partial=True)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {"status": "ERROR", "detail": "Failed to register"}
            )
        registration = serializer.save()
        for order in orders:
            ticketType = TicketType.objects.get(pk=order["id"])
            ticketType.quantity = int(ticketType.quantity) - int(order["quantity"])
            ticketType.save()
            for quantity in range(int(order["quantity"])):
                ticket = {"registration": registration.id, "ticketType": order["id"]}
                ticketSerializer = TicketSerializer(data=ticket, partial=True)
                ticketSerializer.is_valid(raise_exception=True)
                self.perform_create(ticketSerializer)
        sendNewRegistrationEmail(registration,orders)
        return Response({"status": "OK", "data": serializer.data})
    
    def retrieve(self, request, pk=None):
        instance = self.queryset.filter(pk=pk)
        if not instance:
            return Response(
                {"status": "ERROR", "detail": "Failed to retrieve data"}
            )
        serializer = GetRegistrationSerializer(instance[0])
        return Response({"status": "OK", "data": serializer.data})

class TicketViewSet(ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = ViewTicketSerializer

class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class GetUserProfileEventRegistrationsView(APIView):
    def get(self, request):
        user = User.objects.filter(pk=request.user.id)
        serializer = GetUserProfileEventRegistrationsSerializer(instance=user, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetRegistrationsView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = SmallPagination

    def post(self, request):
        registrations = Registration.objects.filter(userId=request.user.id).order_by('-orderDateTime')
        page = self.paginate_queryset(registrations)
        if page is not None:
            serializer = GetRegistrationsSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetRegistrationsSerializer(instance=registrations, many=True, context={"request": request})
        return Response(serializer.data)
    
class GetOrganizerProfileEventReviewsView(APIView):
    def get(self, request):
        user = OrganizerProfile.objects.filter(userId=request.user.id)
        serializer = GetOrganizerProfileEventReviewSerializer(instance=user, many=True, context={"request": request})
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
        organizerProfile, created = OrganizerProfile.objects.get_or_create(userId=request.user)
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

class GetEventRegistrationsView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = BasicPagination

    def post(self, request, *args, **kwargs):
        registrations = Registration.objects.filter(eventId=request.data['eventId'])
        page = self.paginate_queryset(registrations)
        if page is not None:
            serializer = GetEventRegistrationsSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetEventRegistrationsSerializer(instance=registrations, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetEventRegistrationView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = ExtraSmallPagination

    def post(self, request, *args, **kwargs):
        registrations = Registration.objects.filter(eventId=request.data['eventId']).order_by('-orderDateTime')
        page = self.paginate_queryset(registrations)
        if page is not None:
            serializer = GetEventRegistrationSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetEventRegistrationSerializer(instance=registrations, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetEventAttendeesSearchPageView(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.SearchFilter]
    search_fields = ['registration__userId__firstName', 'registration__userId__lastName', 'registration__id', 'ticketType__name']
    pagination_class = BigPagination

    def post(self, request, *args, **kwargs):
        registrations = Registration.objects.filter(eventId=request.data['eventId'])
        tickets = Ticket.objects.filter(registration__in=registrations).order_by('registration__id')
        tickets = self.filter_queryset(tickets)
        page = self.paginate_queryset(tickets)
        if page is not None:
            serializer = GetEventAttendeesSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetEventAttendeesSerializer(instance=tickets, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetEventPerformanceView(APIView):
    def get(self, request, pk=None):
        event = Event.objects.get(pk=pk)
        serializer = GetEventPerformanceSerializer(event)
        return Response({"data": serializer.data})

class GetEventPageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk=None):
        event = Event.objects.get(pk=pk)
        if(event.endDateTime < timezone.now()):
            event.status = 'Ended'
        event.save()
        eventPageVisit, created = EventPageVisit.objects.get_or_create(eventId=event)
        eventPageVisit.visits += 1
        eventPageVisit.save()
        serializer = GetEventPageSerializer(event, context={"request": request})
        print(serializer.data)
        return Response({"data": serializer.data})

class GetRelatedEventsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk=None):
        event = Event.objects.get(pk=pk)
        relatedEvents = Event.objects.filter(Q(organizerId=event.organizerId) | Q(category=event.category)).exclude(pk=pk)[:6]
        serializer = GetRelatedEventsSerializer(relatedEvents, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetEventTicketTypeView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk=None):
        event = Event.objects.get(pk=pk)
        serializer = GetEventTicketTypeSerializer(event)
        return Response({"data": serializer.data})

class GetOrganizedReviewView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = SmallPagination

    def get_queryset(self):
        organizerProfile = OrganizerProfile.objects.get(userId=self.request.user)
        events = Event.objects.filter(organizerId=organizerProfile).values_list('id', flat=True)
        registrations = Registration.objects.filter(eventId__in=events).values_list('id', flat=True)
        queryset = Review.objects.filter(registrationId__in=registrations).order_by('-postedDate')
        return queryset
    
    def post(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = GetOrganizerReviewsSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetOrganizerReviewsSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

class GetEventSearchPageView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'organizerId__organizerName']
    pagination_class = EightPagination

    def post(self, request, *args, **kwargs):
        queryset = Event.objects.filter(status='Published').order_by('id')
        category = request.data["category"]
        type = request.data["type"]
        location = request.data["location"]
        if(category and category != 'all'):
            if(type and type != 'all'):
                queryset = queryset.filter(category=category, type=type)
            else:
                queryset = queryset.filter(category=category)
        else:
            if(type and type != 'all'):
                queryset = queryset.filter(type=type)
        if(location != []):
            lat = location[0]
            lng = location[1]
            queryset = queryset.filter(latitude__isnull=False, longitude__isnull=False)
            queryset = queryset.extra(select={
                'distance': "SELECT (3959 *acos(cos(radians(%f))*cos(radians(latitude))*cos(radians(longitude)-radians(%f))+sin(radians(%f))*sin(radians(latitude))) * 1.609344)"
                %(float(lat), float(lng), float(lat)),
            }, order_by = ['distance'])
        event = self.filter_queryset(queryset)
        page = self.paginate_queryset(event)
        if page is not None:
            serializer = GetEventSearchPageSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetEventSearchPageSerializer(instance=event, many=True, context={"request": request})
        return Response({"data": serializer.data})

# No auth view for organizer page
class GetOrganizerProfileEventReviewsNoAuthView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        user = OrganizerProfile.objects.filter(pk=request.data['organizerId'])
        serializer = GetOrganizerProfileEventReviewSerializer(instance=user, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetOrganizingEventNoAuthView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        organizerProfile = OrganizerProfile.objects.get(pk=request.data['organizerId'])
        event = Event.objects.filter(organizerId=organizerProfile, status__in=["Published","Ended"])
        serializer = GetOrganizingEventsSerializer(instance=event, many=True, context={"request": request})
        return Response({"data": serializer.data})

class GetOrganizedReviewNoAuthView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    pagination_class = SmallPagination

    def get_queryset(self):
        organizerProfile = OrganizerProfile.objects.get(pk=self.request.data['organizerId'])
        events = Event.objects.filter(organizerId=organizerProfile).values_list('id', flat=True)
        registrations = Registration.objects.filter(eventId__in=events).values_list('id', flat=True)
        queryset = Review.objects.filter(registrationId__in=registrations).order_by('-postedDate')
        return queryset
    
    def post(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = GetOrganizerReviewsSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = GetOrganizerReviewsSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

# Reset password
from django_rest_passwordreset.serializers import PasswordTokenSerializer
from django_rest_passwordreset.models import ResetPasswordToken
from django_rest_passwordreset.views import ResetPasswordConfirm

class ResetPasswordCustomView(APIView):

    throttle_classes = ()
    permission_classes = ()
    serializer_class = PasswordTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["token"]

        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()
        loginToken, created = Token.objects.get_or_create(user=reset_password_token.user)
        result = ResetPasswordConfirm().post(request)
        return Response({"status": result.data["status"], "token": loginToken.key})
