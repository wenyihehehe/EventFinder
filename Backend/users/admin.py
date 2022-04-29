from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from .forms import CustomUserCreationForm

class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserCreationForm

    list_display = ('id', 'email', 'firstName','lastName','contactNumber','address')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff','is_superuser','groups')}),
        (
            'Profile',
            {
                'fields':(
                    'firstName',
                    'lastName',
                    'contactNumber',
                    'profileImage',
                )
            }
        ),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

    def address(self, x):
        return x.address

class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'address', 'address2', 'userId')

class OrganizerProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'organizerName', 'userId')

class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'organizerId', 'status')

class TicketTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'eventId', 'name', 'price')

class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('id', 'userId', 'eventId')

class TicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'ticketType', 'registration')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'userId', 'eventId', 'rating', 'comment')

class EventImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'eventId', 'image')

class EventPageVisitAdmin(admin.ModelAdmin):
    list_display = ('id', 'eventId', 'visits')

# Register your models here.
admin.site.register(User, CustomUserAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(OrganizerProfile, OrganizerProfileAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(TicketType, TicketTypeAdmin)
admin.site.register(Registration, RegistrationAdmin)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(EventImage, EventImageAdmin)
admin.site.register(EventPageVisit, EventPageVisitAdmin)