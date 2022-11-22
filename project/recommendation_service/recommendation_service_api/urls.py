from django.urls import include, path

from rest_framework import routers

from recommendation_service_api.views import BooksViewSet, RecommendationsViewSet

# register views for the router, this route is used by the api
router = routers.DefaultRouter()
router.register(r'books', BooksViewSet)
router.register(r'recommendations', RecommendationsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]