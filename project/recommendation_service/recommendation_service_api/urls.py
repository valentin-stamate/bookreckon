from django.urls import include, path

from rest_framework import routers

from recommendation_service_api.views import *

# register views for the router, this route is used by the api
router = routers.DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'recommendation', RecommendationViewSet)
router.register(r'user_recommendation', UserRecommendationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search/', SearchRecommendationViewSet)
]