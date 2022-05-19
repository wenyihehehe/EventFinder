from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

class BasicPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        max_number = math.ceil(self.page.paginator.count / self.page_size)
        max_number = 1 if max_number<=0 else max_number
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'max': max_number,
            'data': data
        })

class ExtraSmallPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        max_number = math.ceil(self.page.paginator.count / self.page_size)
        max_number = 1 if max_number<=0 else max_number
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'max': max_number,
            'data': data
        })

class BigPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        max_number = math.ceil(self.page.paginator.count / self.page_size)
        max_number = 1 if max_number<=0 else max_number
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'max': max_number,
            'data': data
        })

class SmallPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        max_number = math.ceil(self.page.paginator.count / self.page_size)
        max_number = 1 if max_number<=0 else max_number
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'max': max_number,
            'data': data
        })

class EightPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        max_number = math.ceil(self.page.paginator.count / self.page_size)
        max_number = 1 if max_number<=0 else max_number
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'max': max_number,
            'data': data
        })