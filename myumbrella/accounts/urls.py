from django.urls import path
from .api import RegisterAPI, LoginAPI, UserAPI, LogoutAPI
from . import views

urlpatterns = [
    path('auth/register/', RegisterAPI.as_view()),
    path('auth/login/', LoginAPI.as_view()),
    path('auth/user/', UserAPI.as_view()),
    path('auth/logout/', LogoutAPI.as_view()),
    path('login/', views.login),
]
