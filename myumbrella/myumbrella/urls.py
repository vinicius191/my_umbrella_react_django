from django.contrib import admin
from django.urls import path, include, re_path
from . import views


urlpatterns = [
    path('', include('accounts.urls')),
    path('', include('frontend.urls')),
    path('', include('api.urls')),
    path('admin/', admin.site.urls),
    re_path(r'^(?:.*)/?$', views.index),
]
