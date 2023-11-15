from django.shortcuts import render
from signup.models import UserModel
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

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
                return Response("User created succssfully!", status=status.HTTP_201_CREATED)
            return Response("This phone Number is already taken!", status=status.HTTP_401_UNAUTHORIZED)
        return Response("This email is already taken!", status=status.HTTP_401_UNAUTHORIZED)
    return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)

