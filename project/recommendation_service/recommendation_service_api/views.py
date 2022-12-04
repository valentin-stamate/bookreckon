from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, filters
from django.db import DatabaseError, transaction


from recommendation_service_api.serializers import BooksSerializer, RecommendationsSerializer
from recommendation_service_api.models import Books, Recommendations
import scripts.db as rc
import threading

class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer

class RecommendationsViewSet(viewsets.ModelViewSet):
    queryset = Recommendations.objects.all()
    serializer_class = RecommendationsSerializer

    def get_queryset(self):
        genres = self.request.query_params.get('genres')

        queryset = Recommendations.get_recommendation(genres)
        return queryset

def refresh_recommendations_thread():
    results = rc.recommendation_calc()
    books = Books.objects.all()
    try:
        with transaction.atomic():
            Recommendations.objects.all().delete()
            for book in books:
                rec = Recommendations()
                rec.book = book
                rec.recommendations = results[book.id]
                rec.save()
    except DatabaseError:
        print('[view] Could not finish updating recommendations.')

def refresh_recommendations():
    thread = threading.Thread(target=refresh_recommendations_thread)
    thread.start()