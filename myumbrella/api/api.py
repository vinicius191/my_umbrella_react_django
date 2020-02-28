from rest_framework import generics, permissions, status, exceptions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import os
import logging
import requests

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

        logger.info(url)
        
        try:
            r = requests.get(url)
            json = r.json()
            logger.info(r)
            logger.info(json)

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
