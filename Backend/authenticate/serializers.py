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

class SerializerFactory:
    def get_serializer(self, serializer_type):
        if serializer_type == 'user':
            return UserSerializer
        elif serializer_type == 'login_user':
            return LoginUserSerializer
        elif serializer_type == 'token_obtain_pair':
            return MyTokenObtainPairSerializer
        else:
            raise ValueError(f"Invalid serializer type: {serializer_type}")

# Example usage:
factory = SerializerFactory()
user_serializer = factory.get_serializer('user')
login_user_serializer = factory.get_serializer('login_user')
token_obtain_pair_serializer = factory.get_serializer('token_obtain_pair')

