from django.urls import path, re_path
from .api import GetWeather, FavouriteViewSet, GetWeatherFav

fav_list = FavouriteViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'delete': 'destroy'
})

urlpatterns = [
    re_path(r'^api/weather/(?P<q>[\w\ ,]+)/', GetWeather.as_view()),
    path('api/favourite', fav_list, name='favourites'),
    path('api/weather/favourite', GetWeatherFav.as_view()),
]
