from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        response = Response(data)
        response['Content-Range'] = f'items {self.page.start_index()-1}-{self.page.end_index()-1}/{self.page.paginator.count}'
        return response
