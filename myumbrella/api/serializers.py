from rest_framework import serializers
from .models import Favourite

# Favourite Serializer
class FavouriteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Favourite
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}
