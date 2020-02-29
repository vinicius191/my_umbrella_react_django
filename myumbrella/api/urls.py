from django.urls import path, re_path
from .api import GetWeather

urlpatterns = [
    re_path(r'^api/weather/(?P<q>[\w\ ,]+)/', GetWeather.as_view()),
]
