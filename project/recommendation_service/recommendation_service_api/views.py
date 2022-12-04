from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, filters


from recommendation_service_api.serializers import BooksSerializer, RecommendationsSerializer
from recommendation_service_api.models import Books, Recommendations
import scripts.db as rc

class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer

class RecommendationsViewSet(viewsets.ModelViewSet):
    queryset = Recommendations.objects.all()
    serializer_class = RecommendationsSerializer

    def get_queryset(self):
        search = self.request.query_params.get('search')
        genres = self.request.query_params.get('genres')

        queryset = self.get_recommendation(search, genres)
        return queryset

    def get_recommendation(self, search: str, genres: list):
        rc.recommendation_calc()
        return Recommendations.objects.all()