from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from .forms import CustomUserCreationForm

class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserCreationForm

    list_display = ('id', 'email', 'firstName','lastName','contactNumber')

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
                    'photo',
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

# Register your models here.
admin.site.register(User, CustomUserAdmin)