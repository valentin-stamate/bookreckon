from django.contrib import admin
from recommendation_service_api.models import *

# Register your models here.

def update_recommendations(modeladmin, request, queryset):
    from recommendation_service_api.views import refresh_recommendations
    refresh_recommendations()

update_recommendations.short_description = "Update Recommendations"

class BooksAdmin(admin.ModelAdmin):
    actions = [update_recommendations]

admin.site.register(Books, BooksAdmin)
admin.site.register(Recommendations)