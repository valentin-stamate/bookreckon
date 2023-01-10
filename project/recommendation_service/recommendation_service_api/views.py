from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from django.db import DatabaseError, transaction
from django.core import serializers
from django.http import JsonResponse

from recommendation_service_api.serializers import BookSerializer, RecommendationSerializer, UserRecommendationSerializer
from recommendation_service_api.models import Book, Recommendation, UserRecommendation, SentimentPreference, GenrePreference
import scripts.db as rc
import threading
import json

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
        user_id = self.request.query_params.get('id')

        queryset = UserRecommendation.get_user_recommendation(user_id)

        return queryset

def SearchRecommendationViewSet(request):

    if (request.method == "GET"):
        #Serialize the data into json
        data = rc.search_recommendation(request.GET.get('input', ''))
        data = serializers.serialize("json", data)
        # Turn the JSON data into a dict and send as JSON response
        return JsonResponse(json.loads(data), safe=False)

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
        results = rc.improved_recommendation_calc(SentimentPreference.get_user_sentiments(qs.id),
                                                 Book.calculate_average_rating(),
                                                 GenrePreference.get_user_genres(qs.id),
                                                 qs.id)
        results = results.to_dict()['ID']
        try:
            with transaction.atomic():
                if UserRecommendation.objects.filter(id=qs.id).exists():
                    UserRecommendation.objects.get(id=qs.id).delete()
                rec = UserRecommendation()
                rec.user = qs
                recommendations = list()
                for book_id in results.values():
                    book = Book.objects.get(id=book_id)
                    recommendations.append(book.id)
                rec.recommendations = recommendations
                rec.save()
        except DatabaseError:
            print('[view] Could not finish updating user recommendations.')

def refresh_user_recommendations(queryset):
    thread = threading.Thread(target=refresh_user_recommendations_thread, args=(queryset,))
    thread.start()