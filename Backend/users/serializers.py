from rest_framework import serializers
from django.db.models import F, Count, Max, Min, Sum
import datetime
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

class CreateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

class EventUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['title','coverImage','type','category','location','startDateTime','endDateTime','description','status']

class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = "__all__"

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = "__all__"

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"

class ViewTicketSerializer(serializers.ModelSerializer):
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

class GetUserProfileEventRegistrationsSerializer(serializers.ModelSerializer):
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

class GetRegistrationsSerializer(serializers.ModelSerializer):
    event = ShortEventSerializer(source='eventId', read_only=True)
    ticketInfo = serializers.SerializerMethodField()

    def get_ticketInfo(self, registration):
        ticketInfo = Ticket.objects.filter(registration=registration).values(name=F('ticketType__name')).annotate(amount=Count('registration'))
        return ticketInfo

    class Meta:
        model = Registration
        fields = ['id', 'orderDateTime','event','ticketInfo']

class GetOrganizerProfileEventRegistrationsSerializer(serializers.ModelSerializer):
    profileImage = serializers.SerializerMethodField()
    events = serializers.SerializerMethodField()
    registrations = serializers.SerializerMethodField()

    def get_registrations(self, organizerProfile):
        request = self.context.get('request')
        user = request.user
        if(user.has_registration):
            registrations = Registration.objects.filter(userId=user).count()
            return "%s" % (registrations)
        return "0"
    
    def get_events(self, organizerProfile):
        request = self.context.get('request')
        user = request.user
        if(user.has_organizerprofile()):
            events = Event.objects.filter(organizerId=user.organizerprofile).count()
            return "%s" % (events)
        return "0"

    def get_profileImage(self, user):
        request = self.context.get('request')
        profileImage = user.profileImage.url
        return request.build_absolute_uri(profileImage)

    class Meta:
        model = OrganizerProfile
        fields = ['profileImage','organizerName','registrations','events']

class GetOrganizingEventsSerializer(serializers.ModelSerializer):
    pricing = serializers.SerializerMethodField()
    coverImage = serializers.SerializerMethodField()

    def get_pricing(self,event):
        if(event.has_ticketType()):
            ticketType = TicketType.objects.filter(eventId=event).values("eventId").annotate(pricing=Min("price"))
            if (ticketType and int(ticketType[0].get('pricing'))>0):
                return "RM%s" % (ticketType[0].get('pricing'))
            return "RM0"
        return ""
    
    def get_coverImage(self, event):
        request = self.context.get('request')
        coverImage = event.coverImage.url
        return request.build_absolute_uri(coverImage)

    class Meta:
        model = Event
        fields = ['id','coverImage','title','startDateTime','location','pricing','status']

class GetOrganizerReviewsSerializer(serializers.ModelSerializer):
    profileImage = serializers.SerializerMethodField()
    firstName = serializers.SerializerMethodField()
    lastName = serializers.SerializerMethodField()
    event = serializers.SerializerMethodField()

    def get_profileImage(self, review):
        request = self.context.get('request')
        user = review.registrationId.userId
        profileImage = user.profileImage.url
        return request.build_absolute_uri(profileImage)

    def get_firstName(self, review):
        user = review.registrationId.userId
        return user.firstName

    def get_lastName(self, review):
        user = review.registrationId.userId
        return user.lastName

    def get_event(self, review):
        event = review.registrationId.eventId
        return event.title

    class Meta:
        model = Review
        fields = ['id','profileImage','firstName','lastName','postedDate','rating','event','comment']

class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    currentPassword = serializers.CharField(required=True)
    newPassword = serializers.CharField(required=True)

class DeleteEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','soft_delete']

class CreateEventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['eventId','image']

class GetEventDashboardSerializer(serializers.ModelSerializer):
    ticketType = TicketTypeSerializer(many=True)

    class Meta:
        model = Event
        fields = ['id','organizerId','title','startDateTime','type','status','ticketType']

class GetEventSerializer(serializers.ModelSerializer):
    ticketType = TicketTypeSerializer(many=True)
    images = serializers.SerializerMethodField()

    def get_images(self, event):
        response = []
        if(event.has_eventImage()):
            images = event.image.all()
            request = self.context.get('request')
            for item in images:
                url = request.build_absolute_uri(item.image.url)
                response.append(url)
        return response

    class Meta:
        model = Event
        fields = ['id','organizerId','title','coverImage','type','category','location','latitude','longitude','startDateTime','endDateTime','description','status','ticketType', 'images']
    
class GetEventRegistrationsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    amount = serializers.SerializerMethodField()

    def get_name(self, registration):
        name = registration.userId.firstName + " " + registration.userId.lastName
        return name

    def get_email(self, registration):
        email = registration.userId.email
        return email

    def get_amount(self, registration):
        tickets = registration.ticket.all()
        amount = 0
        for ticket in tickets:
            price = ticket.ticketType.price
            amount += int(float(price))
        return amount

    class Meta:
        model = Registration
        fields = ['id','orderDateTime','name','email','amount']

class GetEventRegistrationSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    amount = serializers.SerializerMethodField()
    ticketType = serializers.SerializerMethodField()

    def get_name(self, registration):
        name = registration.userId.firstName + " " + registration.userId.lastName
        return name

    def get_email(self, registration):
        email = registration.userId.email
        return email

    def get_amount(self, registration):
        tickets = registration.ticket.all()
        amount = 0
        for ticket in tickets:
            price = ticket.ticketType.price
            amount += int(float(price))
        return amount

    def get_ticketType(self, registration):
        ticketType = Ticket.objects.filter(registration=registration).values(name=F('ticketType__name')).annotate(quantity=Count('id')).annotate(amount=Sum('ticketType__price'))
        return ticketType

    class Meta:
        model = Registration
        fields = ['id','orderDateTime','name','email','amount', 'ticketType']

class GetEventAttendeesSerializer(serializers.ModelSerializer):
    purchaser = serializers.SerializerMethodField()
    registrationId = serializers.SerializerMethodField()
    ticketType = serializers.StringRelatedField()

    def get_purchaser(self, ticket):
        registration = ticket.registration
        purchaser = registration.userId.firstName + " " + registration.userId.lastName
        return purchaser

    def get_registrationId(self, ticket):
        registrationId = ticket.registration.id
        return registrationId

    class Meta:
        model = Ticket
        fields = ['id','registrationId','purchaser','ticketType','status']

class GetEventPerformanceSerializer(serializers.ModelSerializer):
    pageView = serializers.SerializerMethodField()
    ticketSold = serializers.SerializerMethodField()
    revenue = serializers.SerializerMethodField()
    attendances = serializers.SerializerMethodField()
    ticketSales = serializers.SerializerMethodField()

    def get_pageView(self, event):
        if(event.has_eventPageVisit()):
            pageView = event.eventpagevisit.visits
            return pageView
        return 0

    def get_ticketSold(self, event):
        if(event.has_registration()):
            registrations = event.registration.all()
            tickets = Ticket.objects.filter(registration__in=registrations).aggregate(ticketSold=Count('id'))
            return tickets.get('ticketSold')
        return 0

    def get_revenue(self, event):
        if(event.has_registration()):
            registrations = event.registration.all()
            tickets = Ticket.objects.filter(registration__in=registrations).aggregate(revenue=Sum('ticketType__price'))
            return tickets.get('revenue')
        return 0

    def get_attendances(self, event):
        if(event.has_registration()):
            registrations = event.registration.all()
            attendances = Ticket.objects.filter(registration__in=registrations).values('status').annotate(value=Count('status'))
            for attendance in attendances:
                name = "Attended" if attendance.pop('status') else "Unattended"
                attendance["name"] = name
            return attendances
        return []
    
    def get_ticketSales(self, event):
        if(event.has_registration()):
            registrations = event.registration.all().filter(orderDateTime__lte=datetime.datetime.today(), orderDateTime__gte=datetime.datetime.today()-datetime.timedelta(days=30))
            tickets = Ticket.objects.filter(registration__in=registrations).values(orderDateTime=F('registration__orderDateTime__date')).annotate(ticketSold=Count('id'))
            items = list(tickets)
            dates = [x.get('orderDateTime') for x in items]
            for d in (datetime.datetime.today().date() - datetime.timedelta(days=x) for x in range(0,30)):
                if d not in dates:
                    items.append({'orderDateTime': d, 'ticketSold': 0})
            newlist = sorted(items, key=lambda x: x.get('orderDateTime'), reverse=False)
            return newlist
        return []

    class Meta:
        model = Event
        fields = ['pageView', 'ticketSold','revenue','attendances','ticketSales']

class GetEventPageSerializer(serializers.ModelSerializer):
    organizerId = OrganizerProfileSerializer()
    images = serializers.SerializerMethodField()

    def get_images(self, event):
        response = []
        if(event.has_eventImage()):
            images = event.image.all()
            request = self.context.get('request')
            for item in images:
                url = request.build_absolute_uri(item.image.url)
                response.append(url)
        return response

    class Meta:
        model = Event
        fields = ['title','coverImage','description','location','latitude','longitude','startDateTime','endDateTime', 'images','organizerId']

class GetRelatedEventsSerializer(serializers.ModelSerializer):
    pricing = serializers.SerializerMethodField()
    coverImage = serializers.SerializerMethodField()
    organizerName = serializers.StringRelatedField(source='organizerId')
    organizerProfileImage = serializers.SerializerMethodField()

    def get_pricing(self,event):
        if(event.has_ticketType()):
            ticketType = TicketType.objects.filter(eventId=event).values("eventId").annotate(pricing=Min("price"))
            if (ticketType and int(ticketType[0].get('pricing'))>0):
                return "RM%s" % (ticketType[0].get('pricing'))
            return "RM0"
        return ""
    
    def get_coverImage(self, event):
        request = self.context.get('request')
        coverImage = event.coverImage.url
        return request.build_absolute_uri(coverImage)
    
    def get_organizerProfileImage(self, event):
        organizerProfile = event.organizerId
        request = self.context.get('request')
        profileImage = organizerProfile.profileImage.url
        return request.build_absolute_uri(profileImage)

    class Meta:
        model = Event
        fields = ['id','coverImage','title','startDateTime','location','pricing','status', 'organizerName', 'organizerProfileImage']

class GetEventTicketTypeSerializer(serializers.ModelSerializer):
    organizerName = serializers.StringRelatedField(source='organizerId')
    ticketType = TicketTypeSerializer(many=True)

    class Meta:
        model = Event
        fields = ['title','organizerName','ticketType']