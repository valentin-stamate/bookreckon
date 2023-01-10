from django.contrib import admin
from recommendation_service_api.models import *

# Register your models here.

def update_recommendations(modeladmin, request, queryset):
    from recommendation_service_api.views import refresh_recommendations
    refresh_recommendations()

update_recommendations.short_description = "Update Recommendations"

def update_user_recommendations(modeladmin, request, queryset):
    from recommendation_service_api.views import refresh_user_recommendations
    refresh_user_recommendations(queryset)

update_user_recommendations.short_description = "Update User Recommendations"

class BookAdmin(admin.ModelAdmin):
    actions = [update_recommendations]

class UserAdmin(admin.ModelAdmin):
    actions = [update_user_recommendations]

admin.site.register(User, UserAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Recommendation)
admin.site.register(UserRecommendation)
admin.site.register(SentimentPreference)
admin.site.register(GenrePreference)