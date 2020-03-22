from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
import logging

# Get an instance of a logger
logger = logging.getLogger('my_app')

# Register API
class RegisterAPI(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        logger.info("RegisterAPI data %s", request.data)
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = Token.objects.get(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })

# Log In API
class LoginAPI(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = Token.objects.get(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data, 
            "token": token.key
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permissions_classes = [
        IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# User Logout
class LogoutAPI(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        # Don't delete the token from database. Delete token from frontend state
        # request.user.auth_token.delete()
        return Response({
            'status_code': status.HTTP_200_OK,
            'content': 'You have successfully logged out'

        })
