from django.shortcuts import render
from authenticate.models import UserModel
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, LoginUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(method='POST', request_body=UserSerializer)
@api_view(["POST"])
def signupView(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
           UserModel.objects.get(email=request.data["email"])
        except UserModel.DoesNotExist:
            try:
                UserModel.objects.get(
                    phoneNumber=request.data["phoneNumber"])
            except UserModel.DoesNotExist:
                serializer.save()  
                return Response("User created successfully", status=status.HTTP_201_CREATED)
            return Response("This phone Number is already taken!", status=status.HTTP_401_UNAUTHORIZED)
        return Response("This email is already taken!", status=status.HTTP_401_UNAUTHORIZED)
    return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='POST', request_body=LoginUserSerializer)
@api_view(["POST"])
def loginView(request):
    serializer = LoginUserSerializer(data=request.data)
    if serializer.is_valid():
        try:
         UserModel.objects.get(
            email=request.data["email"])
        except UserModel.DoesNotExist:
            return Response(f"There is no {request.data['email']}", status=status.HTTP_400_BAD_REQUEST)
        try:
         UserModel.objects.get(
            email=request.data["email"], password=request.data["password"])
        except UserModel.DoesNotExist:
            return Response("Password is incorrect", status=status.HTTP_400_BAD_REQUEST)
         
        user = UserModel.objects.get(email=serializer.data['email'])
        print(user.address)
        refresh = RefreshToken.for_user(user)
        detail = {}
        detail["firstName"] = user.firstName
        detail["lastName"] = user.lastName
        detail["phoneNumber"] = user.phoneNumber
        detail["email"] = user.email
        detail["address"] = user.address
        return Response({"detail":detail, "token": str(refresh.access_token)}, status=status.HTTP_201_CREATED)
    return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='GET')
@api_view(["GET"])
def allusers(request):
    users = UserModel.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
