from django.shortcuts import render
from signup.models import UserModel
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import get_user_model, authenticate

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['firstName'] = user.firstName
        # ...

        return token
    

@api_view(["POST"])
def signupView(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
          user = UserModel.objects.get(email=request.data["email"])
        except UserModel.DoesNotExist:
            try:
                user = UserModel.objects.get(
                    phoneNumber=request.data["phoneNumber"])
            except UserModel.DoesNotExist:
                serializer.save() 
                # user = get_user_model().objects.first()
                
                email = serializer.data["email"]
                password = serializer.data["password"]
                print(email, password)
                user = UserModel.objects.get(email=request.data["email"])
                print(user)
                if user is None:
                  print(user)
                  return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)

                refresh = AccessToken.for_user(user)
           
                return Response({"token": refresh}, status=status.HTTP_201_CREATED)
            return Response("This phone Number is already taken!", status=status.HTTP_401_UNAUTHORIZED)
        return Response("This email is already taken!", status=status.HTTP_401_UNAUTHORIZED)
    return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def allusers(request):
    users = UserModel.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
