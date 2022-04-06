from rest_framework import permissions
from .models import *

class OrganizerProfilePermission(permissions.BasePermission):
    
    def has_permission(self, request, view):
        """
        Return true if request is from a user and is authenticated
        """
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        """
        Return true if the request method is 'GET','HEAD','OPTIONS'
        If is other request method, check if request is from a user and obj owned by request user
        """
        if request.method in permissions.SAFE_METHODS:
            return True
        return (request.user and obj.userId == request.user)

class UserProfilePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        """
        POST: For sign up
        """
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        """
        Return true if the request method is 'GET','HEAD','OPTIONS'
        If is other request method, check if request is from a user and obj owned by request user
        """
        if request.method in permissions.SAFE_METHODS:
            return True
        return (request.user and obj == request.user)

class EventPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        """
        Return true if request is from a user and is authenticated
        """
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        """
        Return true if the request method is 'GET','HEAD','OPTIONS'
        If is other request method, check if request is from a user and event owned by request user
        """
        if request.method in permissions.SAFE_METHODS:
            return True
        return (request.user and obj.organizerId.userId == request.user)