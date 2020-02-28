from django.urls import path, re_path
from .api import GetWeather

urlpatterns = [
    #path('api/weather/<str:q>/', GetWeather.as_view()),
    re_path(r'^api/weather/(?P<q>\w+)/', GetWeather.as_view()),
]
