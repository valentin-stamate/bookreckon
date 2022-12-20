# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import DatabaseError, transaction
from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache
from django.db.models import Avg

from jsonfield import JSONField
import random

from typing import List
from security.utils import AESCipher

class Book(models.Model):
    title = models.TextField()
    genre = models.TextField()
    authors = models.TextField()
    audiobook = models.TextField(db_column='audioBook')  # Field name made lowercase.
    cover = models.TextField()
    description = models.TextField()
    imdblink = models.TextField(db_column='imdbLink')  # Field name made lowercase.
    youtubelink = models.TextField(db_column='youtubeLink')  # Field name made lowercase.
    goodreadslink = models.TextField(db_column='goodreadsLink')  # Field name made lowercase.
    rating = models.FloatField()
    ratings = models.IntegerField()
    reviews = models.IntegerField()

    def __str__(self) -> str:
        return str(self.title)

    @staticmethod
    def is_cached() -> bool:
        if cache.get('books'):
            return True
        return False

    @staticmethod
    def json_interest_fields():
        if Book.is_cached():
            books = cache.get('books')
        else:
            books = Book.objects.all() 
        data = dict()
        data["ID"] = dict()
        data["Title"] = dict()
        data["Genre"] = dict()
        data["Rating"] = dict()
        data["Description"] = dict()
        counter = 0
        for book in books:
            data["ID"][counter] = book.id
            data["Title"][counter] = book.title
            data["Genre"][counter] = book.genre
            data["Description"][counter] = book.authors
            data["Rating"][counter] = book.rating
            counter -=- 1
        return data

    @staticmethod
    def calculate_average_rating():
        return Book.objects.all().aggregate(Avg('rating'))

    def encrypt_genres(self, key: bytes) -> List[bytes]:
        aes = AESCipher()
        aes.new(key)
        return list(aes.encrypt(self.genre))

    def encrypt_rest(self, key: bytes):
        aes = AESCipher()
        aes.new(key)

        pt = Book.objects.get(pk=self.pk)

        return aes.encrypt(pt.encode())

    class Meta:
        managed = False
        db_table = 'Book'
        verbose_name = 'Book'
        verbose_name_plural = 'Books'

class GenrePreference(models.Model):
    name = models.TextField()
    userid = models.ForeignKey('User', models.CASCADE, db_column='userId')  # Field name made lowercase.

    @staticmethod
    def is_cached() -> bool:
        if cache.get('genre_preferences'):
            return True
        return False

    @staticmethod
    def get_genres(id):
        genres = GenrePreference.objects.filter(userid = id)
        for genre in genres:
            yield genre.name
    
    @staticmethod
    def get_user_genres(id):
        genres = list(GenrePreference.get_genres(id))
        if len(genres) > 0:
            return genres
        return None

    class Meta:
        managed = False
        db_table = 'GenrePreference'

class SentimentPreference(models.Model):
    name = models.TextField()
    userid = models.ForeignKey('User', models.CASCADE, db_column='userId')  # Field name made lowercase.

    @staticmethod
    def is_cached() -> bool:
        if cache.get('sentiment_preferences'):
            return True
        return False

    @staticmethod
    def get_sentiments(id):
        sentiments = SentimentPreference.objects.filter(userid = id)
        for sentiment in sentiments:
            yield sentiment.name
    
    @staticmethod
    def get_user_sentiments(id):
        preferences = list(SentimentPreference.get_sentiments(id))
        if len(preferences) > 0:
            return preferences
        return None

    class Meta:
        managed = False
        db_table = 'SentimentPreference'

class User(models.Model):
    username = models.TextField(unique=True)
    email = models.TextField(unique=True)
    password = models.TextField()

    @staticmethod
    def is_cached() -> bool:
        if cache.get('users'):
            return True
        return False

    def __str__(self) -> str:
        return self.username

    class Meta:
        managed = False
        db_table = 'User'

class PrismaMigrations(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    checksum = models.CharField(max_length=64)
    finished_at = models.DateTimeField(blank=True, null=True)
    migration_name = models.CharField(max_length=255)
    logs = models.TextField(blank=True, null=True)
    rolled_back_at = models.DateTimeField(blank=True, null=True)
    started_at = models.DateTimeField()
    applied_steps_count = models.IntegerField()

    class Meta:
        managed = False
        db_table = '_prisma_migrations'

# THE FOLLOWING PART IS NOT GENERATED USING python manage.py inspectdb > models.py

class Recommendation(models.Model):
    book = models.ForeignKey(Book, models.CASCADE)
    recommendations = JSONField(null=True)

    def __str__(self) -> str:
        return str(self.book.title) + " Recommendation"
    
    @staticmethod
    def is_cached() -> bool:
        if cache.get('recommendations'):
            return True
        return False

    @staticmethod
    def get_recommendation(genres: list):
        recommendation_list = set()
        for genre in genres:
            try: 
                related_books = Book.objects.get(genre=genre)
                for rb in related_books:
                    current = Recommendation.objects.get(book=rb)
                    recommendation_list.add(current.recommendations[:3])
            except ObjectDoesNotExist:
                pass
        if len(recommendation_list) > 0:
            random.shuffle(recommendation_list)
            return recommendation_list
        return Recommendation.objects.all()

    @staticmethod
    def get_book_recommendation(book_id):
        return Recommendation.objects.filter(book__id = book_id)
    
    class Meta:
        verbose_name = 'Recommendation'
        verbose_name_plural = 'Recommendations'

class UserRecommendation(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    recommendations = JSONField(null=True)

    def __str__(self) -> str:
        return str(self.user.username) + " Recommendation"

    @staticmethod
    def is_cached() -> bool:
        if cache.get('user_recommendations'):
            return True
        return False

    @staticmethod
    def get_user_recommendation(user_id):
        recommendation_list = UserRecommendation.objects.filter(user__id = user_id)
        if len(recommendation_list) > 0:
            random.shuffle(recommendation_list)
            return recommendation_list
    class Meta:
        verbose_name = 'UserRecommendation'
        verbose_name_plural = 'UserRecommendations'

# Application doesn't work. What do I do?
# 1. cd project\recommendation_service
# 2. python manage.py migrate
# 3. python manage.py runserver
# Still doesn't work?
# 4. Run the following query in pgAdmin
# DO $$ DECLARE
#     r RECORD;
# BEGIN
#     FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
#         EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
#     END LOOP;
# END $$;
# 5. python manage.py migrate
# 6. cd ..
# 7. cd backend
# 8. npm start
# 9. CTRL + C
# 10. y
# 11. ENTER
# 12. cd recommendation_service
# 13. python manage.py runserver
# Still doesn't work?
# 14. Accept your fate.

@receiver(post_save, sender=User)
def cache_users(sender, instance, **kwargs):
    users = User.objects.all()
    cache.set('users', users)

@receiver(post_save, sender=Recommendation)
def cache_recommendations(sender, instance, **kwargs):
    recommendations = Recommendation.objects.all()
    cache.set('recommendations', recommendations)

@receiver(post_save, sender=UserRecommendation)
def cache_user_recommendations(sender, instance, **kwargs):
    recommendations = UserRecommendation.objects.all()
    cache.set('user_recommendations', recommendations)

def cache_sentiment_preference():
    sentiment_preferences = SentimentPreference.objects.all()
    cache.set('sentiment_preferences', sentiment_preferences)

def cache_genre_preferences():
    genre_preferences = GenrePreference.objects.all()
    cache.set('genre_preferences', genre_preferences)

def cache_books():
    books = Book.objects.all()
    cache.set('books', books)

@receiver(post_save, sender=SentimentPreference)
def update_user_recommendations(sender, instance, **kwargs):
    try:
        with transaction.atomic():
            from recommendation_service_api.views import refresh_user_recommendations
            user = User.objects.get(id=instance.userid)
            refresh_user_recommendations(user)
    except DatabaseError:
        print('[models] Could not finish updating user recommendations.')
    cache_sentiment_preference()

@receiver(post_save, sender=GenrePreference)
def update_user_recommendations(sender, instance, **kwargs):
    try:
        with transaction.atomic():
            from recommendation_service_api.views import refresh_user_recommendations
            user = User.objects.get(id=instance.userid)
            refresh_user_recommendations(user)
    except DatabaseError:
        print('[models] Could not finish updating user recommendations.')
    cache_genre_preferences()
    
@receiver(post_save, sender=Book)
def update_recommendations(sender, instance, **kwargs):
    try:
        with transaction.atomic():
            from recommendation_service_api.views import refresh_recommendations
            refresh_recommendations()
    except DatabaseError:
        print('[models] Could not finish updating recommendations.')
    cache_books()