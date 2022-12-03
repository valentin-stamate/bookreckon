from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, filters


from recommendation_service_api.serializers import BooksSerializer, RecommendationsSerializer
from recommendation_service_api.models import Books, Recommendations

class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer
    
class RecommendationsViewSet(viewsets.ModelViewSet):
    queryset = Recommendations.objects.all()
    serializer_class = RecommendationsSerializer

    def get_queryset(self):
        search = self.request.query_params.get('search')
        genres = self.request.query_params.get('genres')

        queryset = Recommendations.get_recommendation(search, genres)
        return queryset