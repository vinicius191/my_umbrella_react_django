from django.urls import path, re_path
from . import views

handler404 = 'frontend.views.view_404'

urlpatterns = [
    path('', views.index ),
]
