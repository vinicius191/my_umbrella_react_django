from django.contrib import admin
from .models import Favourite

class FavouriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'city_country', 'created_at')

admin.site.register(Favourite, FavouriteAdmin)
