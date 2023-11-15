from rest_framework import serializers
from .models import UserModel

class UserSerializer(serializers.Serializer):
    
    firstName = serializers.CharField(max_length=50)
    lastName = serializers.CharField(max_length=50)
    phoneNumber = serializers.CharField(max_length=11)
    email = serializers.EmailField(max_length=50)
    address = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)


    def create(self, validated_data):
       return UserModel.objects.create(**validated_data)
