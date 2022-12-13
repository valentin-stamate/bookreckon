from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, filters
from django.db import DatabaseError, transaction


from recommendation_service_api.serializers import BookSerializer, RecommendationSerializer, UserRecommendationSerializer
from recommendation_service_api.models import Book, Recommendation, UserRecommendation, SentimentPreference
import scripts.db as rc
import threading

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class RecommendationViewSet(viewsets.ModelViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer

    def get_queryset(self):
        genres = self.request.query_params.get('genres')
        book_id = self.request.query_params.get('id')

        if genres is not None:
            queryset = Recommendation.get_recommendation(genres)
            return queryset
        if book_id is not None:
            queryset = Recommendation.get_book_recommendation(book_id)
            return queryset
        queryset = Recommendation.objects.all()
        return queryset


class UserRecommendationViewSet(viewsets.ModelViewSet):
    queryset = UserRecommendation.objects.all()
    serializer_class = UserRecommendationSerializer

    def get_queryset(self):
        genres = self.request.query_params.get('genres')

        queryset = UserRecommendation.get_recommendation(genres)

        return queryset

def refresh_recommendations_thread():
    results = rc.recommendation_calc()
    books = Book.objects.all()
    try:
        with transaction.atomic():
            Recommendation.objects.all().delete()
            for book in books:
                rec = Recommendation()
                rec.book = book
                rec.recommendations = results[book.id]
                rec.save()
    except DatabaseError:
        print('[view] Could not finish updating recommendations.')

def refresh_recommendations():
    thread = threading.Thread(target=refresh_recommendations_thread)
    thread.start()

def refresh_user_recommendations_thread(queryset):
    for qs in queryset:
        results = rc.improved_recommendation_calc(SentimentPreference.get_user_sentiments(qs.id), Book.calculate_average_rating(), qs.id)
        books = Book.objects.all()
        try:
            with transaction.atomic():
                UserRecommendation.objects.get(id=qs.id).delete()
                for book in books:
                    rec = UserRecommendation()
                    rec.user = qs.user
                    rec.recommendations = results[book.id]
                    rec.save()
        except DatabaseError:
            print('[view] Could not finish updating user recommendations.')

def refresh_user_recommendations(queryset):
    thread = threading.Thread(target=refresh_user_recommendations_thread, args=(queryset,))
    thread.start()