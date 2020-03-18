from rest_framework import generics, permissions, status, exceptions, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
import os
import logging
import requests
from .models import Favourite
from .serializers import FavouriteSerializer
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .utils import pretty_request

# Get an instance of a logger
logger = logging.getLogger('my_app')

class GetWeather(generics.GenericAPIView):
    permission_classes = [AllowAny]

    """
    Call ForeCast Api and get Weather data.
    """
    def get(self, request, q):
        weather_apikey = os.environ.get('WEATHER_KEY')
        weather_cnt = os.environ.get('WEATHER_CNT')
        weather_unit = os.environ.get('WEATHER_UNIT')
        weather_url = os.environ.get('WEATHER_URL')

        url = weather_url + self.kwargs['q'] + '&cnt=' + weather_cnt + '&units=' + weather_unit + '&appid=' + weather_apikey
        
        try:
            r = requests.get(url)
            json = r.json()

            response_ = Response

            if json['cod'] == '200':
                response_ = Response(json, status=status.HTTP_200_OK)
            else:
                if 'message' in json:
                    response_ = Response({"error": json['message']}, status=json['cod'])
            
            return response_
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class FavouriteViewSet(viewsets.ModelViewSet):
    
    permissions_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = FavouriteSerializer

    def get_queryset(self, request, *args, **kwargs):
        logger.info("get_query")
        queryset = Favourite.objects.all()
        return queryset
    
    def perform_create(self, serializer):
        logger.info("perform_create %s", self.request.data['city_country'])
        user = User.objects.get(username=self.request.user)
        fav = Favourite()
        fav.city_country = self.request.data['city_country']
        fav.user = user
        fav.save()


