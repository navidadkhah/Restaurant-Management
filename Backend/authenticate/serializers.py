from rest_framework import serializers
from .models import UserModel
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = UserModel
      fields = '__all__'


class LoginUserSerializer(serializers.ModelSerializer):
   class Meta:
      model = UserModel
      fields = ("email", "password")


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['firstName'] = user.firstName
        # ...

        return token
