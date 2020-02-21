from django.urls import path
from .api import RegisterAPI, LoginAPI, UserAPI, LogoutAPI

urlpatterns = [
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', LogoutAPI.as_view()),
]
