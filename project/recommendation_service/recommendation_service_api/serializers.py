from rest_framework import serializers

from recommendation_service_api.models import Books, Recommendations

# serialize data displayed by the api, usually use __all__ for all fields
class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = '__all__'

class RecommendationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendations
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['book'] = BooksSerializer(instance=instance.book, context=self.context, many=False, required=False, read_only=False)
        return super().to_representation(instance)