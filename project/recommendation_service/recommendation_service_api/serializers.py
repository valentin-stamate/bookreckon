from rest_framework import serializers

from recommendation_service_api.models import Books, Recommendations

# serialize data displayed by the api, usually use __all__ for all fields
class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = '__all__'

class RecommendationsSerializer(serializers.ModelSerializer):
    book = serializers.SerializerMethodField()

    def get_book(self, instance):
        return BooksSerializer(instance=instance.book, context=self.context, many=False, required=False, read_only=False).data
    class Meta:
        model = Recommendations
        fields = '__all__'