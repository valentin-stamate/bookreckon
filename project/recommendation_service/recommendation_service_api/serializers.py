from rest_framework import serializers

from recommendation_service_api.models import Person

# serialize data displayed by the api, usually use __all__ for all fields
class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'