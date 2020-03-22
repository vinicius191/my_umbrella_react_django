from rest_framework import generics, permissions, status, exceptions, viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
import os
import logging
import requests
from .models import Favourite
from .serializers import FavouriteSerializer
from django.contrib.auth.models import User, AnonymousUser
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .utils import pretty_request
from django.core import serializers
from django.http import JsonResponse
import json

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
            jsonData = r.json()

            response_ = Response

            if jsonData['cod'] == '200':
                if isinstance(request.user, User):
                    city_country = jsonData['city']['name'] + ', ' + jsonData['city']['country']
                    fav = [fav.json() for fav in Favourite.objects.filter(city_country=city_country, user=request.user).all()]
                    logger.info("fav %s", fav)
                    if fav:
                        data = json.dumps(fav)
                        fav[0]['star'] = 'fa fa-star'
                        jsonData['favourite'] = fav[0]
                    else:
                        jsonData['favourite'] = {'star': 'fa fa-star-o'}
                response_ = HttpResponse(json.dumps(jsonData), content_type='application/json; charset=UTF-8', status=status.HTTP_200_OK)
            else:
                if 'message' in jsonData:
                    response_ = Response({"error": jsonData['message']}, status=jsonData['cod'])
            
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

    def list(self, request, *args, **kwargs):
        
        response_ = Response

        logger.info("get_query")
        fav = [fav.json() for fav in Favourite.objects.filter(user=request.user).all()]
        logger.info("fav %s", fav)

        jsonData = {}
        jsonData['favs'] = []

        if fav:
            jsonData['favs'] = fav

        response_ = HttpResponse(json.dumps(jsonData), content_type='application/json; charset=UTF-8', status=status.HTTP_200_OK)

        return response_
    
    def perform_create(self, serializer):
        logger.info("perform_create %s", self.request.data['city_country'])
        user = User.objects.get(username=self.request.user)
        fav = Favourite()
        fav.city_country = self.request.data['city_country']
        fav.user = user
        fav.save()

    def destroy(self, request, *args, **kwargs):
        logger.info('destroy %s', request.data)
        user = User.objects.get(username=self.request.user)
        fav = Favourite.objects.filter(user=request.user, city_country=self.request.data['city_country'])
        if fav:
            fav.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "City Country not found for the user to be deleted"}, status=status.HTTP_400_BAD_REQUEST)

    def perform_destroy(self, instance):
        instance.delete()

