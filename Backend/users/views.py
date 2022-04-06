from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import *
from .serializers import *

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer

    def partial_update(self, request, pk=None):
        user = User.objects.get(pk=pk)
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
                {"status": "ERROR", "detail": "Unable to create user"}
            )
        serializer.save()
        return Response({"status": "OK", "data": serializer.data})

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

class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

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
