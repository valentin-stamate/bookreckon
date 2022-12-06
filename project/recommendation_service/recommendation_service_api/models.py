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

from jsonfield import JSONField
import random

class Authors(models.Model):
    firstname = models.TextField(db_column='firstName', blank=True, null=True)  # Field name made lowercase.
    lastname = models.TextField(db_column='lastName', blank=True, null=True)  # Field name made lowercase.
    birthdate = models.DateTimeField(db_column='birthDate', blank=True, null=True)  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'authors'


class BookUsers(models.Model):
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    userid = models.OneToOneField('Users', models.DO_NOTHING, db_column='userId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey('Books', models.DO_NOTHING, db_column='bookId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'book_users'
        unique_together = (('userid', 'bookid'),)


class Books(models.Model):
    title = models.TextField(blank=True, null=True)
    genre = models.TextField(blank=True, null=True)
    authors = models.TextField(blank=True, null=True)
    audiobook = models.TextField(db_column='audioBook', blank=True, null=True)  # Field name made lowercase.
    photo = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    imdb = models.TextField(blank=True, null=True)
    youtube = models.TextField(blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    def __str__(self) -> str:
        return str(self.title)

    @staticmethod
    def json_interest_fields():
        books = Books.objects.all()
        data = dict()
        data["ID"] = dict()
        data["Title"] = dict()
        data["Genre"] = dict()
        data["Authors"] = dict()
        counter = 0
        for book in books:
            data["ID"][counter] = book.id
            data["Title"][counter] = book.title
            data["Genre"][counter] = book.genre
            data["Authors"][counter] = book.authors
            counter -=- 1
        return data

    class Meta:
        managed = False
        db_table = 'books'
        verbose_name = 'Book'
        verbose_name_plural = 'Books'

@receiver(post_save, sender=Books)
def update_recommendations(sender, instance, **kwargs):
    try:
        with transaction.atomic():
            from recommendation_service_api.views import refresh_recommendations
            refresh_recommendations()
    except DatabaseError:
        print('[models] Could not finish updating recommendations.')

class PreferenceUsers(models.Model):
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    userid = models.OneToOneField('Users', models.DO_NOTHING, db_column='userId', primary_key=True)  # Field name made lowercase.
    preferenceid = models.ForeignKey('Preferences', models.DO_NOTHING, db_column='preferenceId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'preference_users'
        unique_together = (('userid', 'preferenceid'),)


class Preferences(models.Model):
    name = models.TextField(blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'preferences'


class UserBooks(models.Model):
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    bookid = models.OneToOneField(Books, models.DO_NOTHING, db_column='bookId', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='userId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'user_books'
        unique_together = (('bookid', 'userid'),)


class UserPreference(models.Model):
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    preferenceid = models.OneToOneField(Preferences, models.DO_NOTHING, db_column='preferenceId', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='userId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'user_preference'
        unique_together = (('preferenceid', 'userid'),)


class Users(models.Model):
    username = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    password = models.TextField(blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'users'

# THE FOLLOWING PART IS NOT GENERATED USING python manage.py inspectdb > models.py

class Recommendations(models.Model):
    book = models.ForeignKey(Books, models.DO_NOTHING)
    recommendations = JSONField(null=True)

    def __str__(self) -> str:
        return str(self.book.title) + " Recommendation"
    
    @staticmethod
    def get_recommendation(genres: list):
        if genres is None:
            return Recommendations.objects.all()
        recommendation_list = set()
        for genre in genres:
            try: 
                related_books = Books.objects.get(genre=genre)
                for rb in related_books:
                    current = Recommendations.objects.get(book=rb)
                    recommendation_list.add(current.recommendations[:3])
            except ObjectDoesNotExist:
                pass
        if len(recommendation_list) > 0:
            random.shuffle(recommendation_list)
            return recommendation_list
        return Recommendations.objects.all()
    
    class Meta:
        verbose_name = 'Recommendation'
        verbose_name_plural = 'Recommendations'

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
