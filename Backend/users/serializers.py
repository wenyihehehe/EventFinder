from rest_framework import serializers
from django.db.models import F
from .models import *

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'firstName', 'lastName', 'profileImage', 'contactNumber']

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['firstName', 'lastName', 'profileImage', 'contactNumber']

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'firstName', 'lastName', 'contactNumber')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"

class OrganizerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizerProfile
        fields = "__all__"

class OrganizerProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizerProfile
        fields = ['organizerName','profileImage','contactNumber','description']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

class EventUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['title','coverImage','type','category','location','startDateTime','endDateTime','image','description','status']

class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = "__all__"

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = "__all__"

class TicketSerializer(serializers.ModelSerializer):
    ticketType = serializers.StringRelatedField()

    class Meta:
        model = Ticket
        fields = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class OrganizerEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizerProfile
        fields = ['event']

from django.db.models import Count

# q = A.objects.select_related('B').annotate(num_B=Count('B'))

class GetProfileSerializer(serializers.ModelSerializer):
    profileImage = serializers.SerializerMethodField()
    events = serializers.SerializerMethodField()
    registrations = serializers.SerializerMethodField()

    def get_registrations(self, user):
        if(user.has_registration):
            registrations = Registration.objects.filter(userId=user).count()
            return "%s" % (registrations)
        return "0"
    
    def get_events(self, user):
        if(user.has_organizerprofile()):
            events = Event.objects.filter(organizerId=user.organizerprofile).count()
            return "%s" % (events)
        return "0"

    def get_profileImage(self, user):
        request = self.context.get('request')
        profileImage = user.profileImage.url
        return request.build_absolute_uri(profileImage)

    class Meta:
        model = User
        fields = ['profileImage','firstName','lastName','email','registrations','events']

class ShortEventSerializer(serializers.ModelSerializer):
    organizer = serializers.StringRelatedField(source='organizerId')

    class Meta:
        model = Event
        fields = ['title','organizer','startDateTime','endDateTime']

class ShortTicketSerializer(serializers.ModelSerializer):
    ticket = serializers.SerializerMethodField()
    amount = serializers.CharField()

    def get_ticket(self, ticket):
        # name = Ticket.objects.get(pk=ticket.ticketType).name
        print(ticket)
        # print(ticket.amount)
        # print(name)
        return ""

    class Meta:
        model = Ticket
        fields = ['ticket','amount']

class GetRegistrationsSerializer(serializers.ModelSerializer):
    event = ShortEventSerializer(source='eventId', read_only=True)
    ticketInfo = serializers.SerializerMethodField()

    def get_ticketInfo(self, registration):
        ticketInfo = Ticket.objects.filter(registration=registration).values(name=F('ticketType__name')).annotate(amount=Count('registration'))
        print(ticketInfo)
        return ticketInfo

    class Meta:
        model = Registration
        fields = ['id', 'orderDateTime','event','ticketInfo']