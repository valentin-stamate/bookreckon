from django.db import models

# Create your models here.

# if changes are made to models
# first run: python3 manage.py makemigrations
# then run: python3 manage.py migrate

# template model for demonstration
class Person(models.Model):
    name = models.CharField(max_length=100)