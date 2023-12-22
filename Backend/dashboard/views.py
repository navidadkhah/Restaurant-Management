from django.shortcuts import render
from dashboard.models import RestaurantAdminMenuModel,RestaurantAdminProfileModel,RestaurantAdminModel , siteAdminModel
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RestaurantAdminMenuModelSerializer,RestaurantAdminProfileModelSerializer,RestaurantAdminSerializer,siteAdminModelSerializer
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


# updating restaurant uncritical info by res-admin
@swagger_auto_schema(method='PATCH')
@api_view(["PATCH"])
def updateResInfoView(request , pk):
    try:
        user = RestaurantAdminProfileModel.objects.get(pk=pk)
    except RestaurantAdminProfileModel.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    data_to_update = {}
    if 'restaurantDescription' in request.data:
        data_to_update['restaurantDescription'] = request.data['restaurantDescription']
    if 'restaurantImage' in request.data:
        data_to_update['restaurantImage'] = request.data['restaurantImage']

    serializer = RestaurantAdminProfileModelSerializer(user, data=data_to_update, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=400)

# site admin
@swagger_auto_schema(method='POST', request_body=siteAdminModelSerializer)
@api_view(["POST"])
def CreateSiteAdmin(request):
    serializer = siteAdminModelSerializer(data=request.data)
    if serializer.is_valid():
        try:
           siteAdminModelSerializer.objects.get(restaurantName=request.data["restaurantName"])
        except siteAdminModel.DoesNotExist:
            return Response("This Restaurant already exist!", status=status.HTTP_401_UNAUTHORIZED)
        return Response("Restaurant profile successfully created", status=status.HTTP_201_CREATED)
    return Response("Some fields are missing", status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='GET')
@api_view(["GET"])
def GetCreateSiteAdmin(request):
    users = siteAdminModel.objects.all()
    serializer = siteAdminModelSerializer(users, many=True)
    return Response(serializer.data)

# restaurant admin
@swagger_auto_schema(method='POST', request_body=RestaurantAdminSerializer)
@api_view(["POST"])
def CreateRestaurantAdmin(request):
    serializer = RestaurantAdminSerializer(data=request.data)
    if serializer.is_valid():
        try:
           RestaurantAdminSerializer.objects.get(restaurantUsername=request.data["restaurantUsername"])
        except RestaurantAdminModel.DoesNotExist:
            return Response("This Username already exist!", status=status.HTTP_401_UNAUTHORIZED)
        return Response("Profile successfully created", status=status.HTTP_201_CREATED)
    return Response("Some fields are missing", status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='GET')
@api_view(["GET"])
def GetRestaurantAdmin(request):
    users = RestaurantAdminModel.objects.all()
    serializer = RestaurantAdminSerializer(users, many=True)
    return Response(serializer.data)
