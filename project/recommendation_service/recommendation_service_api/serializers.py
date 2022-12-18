from rest_framework import serializers

from recommendation_service_api.models import User, Book, Recommendation, UserRecommendation

# serialize data displayed by the api, usually use __all__ for all fields
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['book'] = BookSerializer(instance=instance.book, context=self.context, many=False, required=False, read_only=False)
        return super().to_representation(instance)

class UserRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRecommendation
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['user'] = UserSerializer(instance=instance.user, context=self.context, many=False, required=False, read_only=False)
        return super().to_representation(instance)