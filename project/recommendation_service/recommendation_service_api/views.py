from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets

from recommendation_service_api.serializers import PersonSerializer
from recommendation_service_api.models import Person

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer