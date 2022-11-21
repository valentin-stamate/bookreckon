from django.urls import include, path

from rest_framework import routers

from recommendation_service_api.views import PersonViewSet

# register views for the router, this route is used by the api
router = routers.DefaultRouter()
router.register(r'persons', PersonViewSet)

urlpatterns = [
    path('', include(router.urls)),
]