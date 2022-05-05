from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from .managers import *


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT user_photo/ user_<id>/<filename>
    return "user_photo/user_{0}/{1}".format(instance.id, filename)

def event_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT user_photo/ user_<id>/<filename>
    return "event_photo/event_{0}/{1}".format(instance.id, filename)

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = None
    email = models.EmailField(("email address"), unique=True)
    profileImage = models.ImageField(null=True, blank=True, upload_to=user_directory_path)
    firstName = models.CharField(max_length=50, default="-", null=True, blank=True)
    lastName = models.CharField(max_length=50, default="-", null=True, blank=True)
    contactNumber = models.CharField(max_length=11, null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def has_organizerprofile(self):
        try:
            self.organizerprofile
            return True
        except:
            return False

    def has_registration(self):
        return self.registration.exists()


'''
Extended from User
'''
class Address(models.Model):
    COUNTRY = (
        ("Malaysia", "Malaysia"),
    )

    STATE = (
        ("Johor", "Johor"),
        ("Kedah", "Kedah"),
        ("Kelantan", "Kelantan"),
        ("Malacca", "Malacca"),
        ("Negeri Sembilan", "Negeri Sembilan"),
        ("Pahang", "Pahang"),
        ("Penang", "Penang"),
        ("Perak", "Perak"),
        ("Perlis", "Perlis"),
        ("Sabah", "Sabah"),
        ("Sarawak", "Sawarak"),
        ("Selangor", "Selangor"),
        ("Terengganu", "Terengganu"),
        ("Kuala Lumpur", "Kuala Lumpur"),
        ("Labuan", "Labuan"),
        ("Putrajaya", "Putrajaya"),
    )

    id = models.AutoField(primary_key=True)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    address2 = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=8, choices=COUNTRY)
    postalCode = models.CharField(max_length=5)
    state = models.CharField(max_length=15, choices=STATE)

    def __str__(self):
        return self.address

'''
Extended from User
'''
class OrganizerProfile(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.OneToOneField(User, on_delete=models.CASCADE)
    organizerName = models.CharField(max_length=50)
    profileImage = models.ImageField(null=True, blank=True)
    contactEmail = models.EmailField(("email address"), unique=True, null=True, blank=True)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.organizerName

class Event(models.Model):
    STATUS = (
        ("Draft", "Draft"),
        ("Published", "Published"),
        ("Ended", "Ended"),
    )

    id = models.AutoField(primary_key=True)
    organizerId = models.ForeignKey(OrganizerProfile, on_delete=models.CASCADE, related_name="event")    
    title = models.CharField(null=True, blank=True, max_length=100)
    coverImage = models.ImageField(null=True, blank=True, upload_to=event_directory_path, default="DefaultCoverImage.png")
    type = models.CharField(null=True, blank=True, max_length=10)
    category = models.CharField(null=True, blank=True, max_length=20)
    location = models.TextField(null=True, blank=True, max_length=400)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    startDateTime = models.DateTimeField(null=True, blank=True)
    endDateTime = models.DateTimeField(null=True, blank=True)
    description = models.TextField(null=True, blank=True, max_length=500)
    status = models.CharField(max_length=9, choices=STATUS, default="Draft")

    # Handle soft deletion
    soft_delete = models.BooleanField(default=False)
    objects = EventManager()

    def __str__(self):
        return self.title if self.title else ""

    def has_ticketType(self):
        return self.ticketType.exists()

    def has_eventImage(self):
        return self.image.exists()

    def has_registration(self):
        return self.registration.exists()
    
    def has_eventPageVisit(self):
        try:
            self.eventpagevisit
            return True
        except:
            return False

class EventImage(models.Model):
    id = models.AutoField(primary_key=True)
    eventId = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="image")
    image = models.ImageField(null=True, blank=True)

class TicketType(models.Model):
    id = models.AutoField(primary_key=True)
    eventId = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="ticketType")
    name = models.CharField(max_length=10)
    type = models.CharField(max_length=10)
    quantity = models.CharField(max_length=10)
    price = models.CharField(max_length=10)

    def __str__(self):
        return "%s" % (self.name)
    
    def has_ticketSold(self):
        return self.ticket.exists()

class Registration(models.Model):
    STATUS = (
        ("Active", "Active"),
        ("Completed", "Completed"),
    )

    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name="registration")
    eventId = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registration")
    orderDateTime = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=9, choices=STATUS, default="Active")
    
    def __str__(self):
        return "%s:%s:%s" % (self.id, self.userId, self.eventId)
    
    def has_review(self):
        try:
            self.review
            return True
        except:
            return False

class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    ticketType = models.ForeignKey(TicketType, on_delete=models.CASCADE, related_name="ticket")
    registration = models.ForeignKey(Registration, on_delete=models.CASCADE, related_name="ticket")
    status = models.BooleanField(default=False)

    def __str__(self):
        return "%s %s" % (self.registration, self.ticketType)    

class Review(models.Model):
    id = models.AutoField(primary_key=True)
    registrationId = models.OneToOneField(Registration, on_delete=models.CASCADE, related_name="review")
    rating = models.SmallIntegerField()
    comment = models.CharField(max_length=200)
    postedDate = models.DateField(auto_now_add=True)

    def __str__(self):
        return "%s:%s" % (self.registrationId, self.comment)    

# TODO: Create object when event is published. Update visit whenever a request is created to get event page data
class EventPageVisit(models.Model):
    id = models.AutoField(primary_key=True)
    eventId = models.OneToOneField(Event, on_delete=models.CASCADE)
    visits = models.PositiveIntegerField(default=0)