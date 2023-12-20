from django.shortcuts import render
from dashboard.models import RestaurantAdminMenuModel
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RestaurantAdminMenuModelSerializer
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(method='POST', request_body=RestaurantAdminMenuModelSerializer)
@api_view(["POST"])
def CreateFoodView(request):
    serializer = RestaurantAdminMenuModelSerializer(data=request.data)
    if serializer.is_valid():
        try:
           RestaurantAdminMenuModel.objects.get(foodName=request.data["foodName"])
        except RestaurantAdminMenuModel.DoesNotExist:
            return Response("This food name is already exists!", status=status.HTTP_401_UNAUTHORIZED)
        return Response("Food successfully created", status=status.HTTP_201_CREATED)
    return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='GET')
@api_view(["GET"])
def allMenuView(request):
    users = RestaurantAdminMenuModel.objects.all()
    serializer = RestaurantAdminMenuModelSerializer(users, many=True)
    return Response(serializer.data)
