from django.shortcuts import render
from dashboard.models import RestaurantMenuModel, siteAdminModel
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RestaurantMenuModelSerializer,RestaurantAdminProfileModelSerializer,RestaurantAdminLoginSerializer,siteAdminModelSerializer, RestaurantAdminGetMenuSerializer,RestaurantMenuAllSerializer,RestaurantRateSerializer
from drf_yasg.utils import swagger_auto_schema
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
import shutil

# create food by restaurant admin
@swagger_auto_schema(method='POST', request_body=RestaurantMenuModelSerializer)
@api_view(["POST"])
def CreateFoodView(request):
    serializer = RestaurantMenuModelSerializer(data=request.data)
    if serializer.is_valid():
        try:
           RestaurantMenuModel.objects.get(restaurantName=request.data["restaurantName"], foodName=request.data["foodName"])
        except RestaurantMenuModel.DoesNotExist:
           serializer.save()
           copyImages(serializer.instance.foodImage)
           return Response("Food successfully created", status=status.HTTP_201_CREATED)
        return Response("This food name is already exists!", status=status.HTTP_401_UNAUTHORIZED)
    return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)

# get all restaurant's menu 
@swagger_auto_schema(method='GET')
@api_view(["GET"])
def allMenuView(request, restaurantName):
     try:
        menu_queryset = RestaurantMenuModel.objects.filter(restaurantName=restaurantName)
        
        # Check if there are any menus with the given restaurantName
        if not menu_queryset.exists():
            return Response("This restaurant doesn't exist", status=status.HTTP_404_NOT_FOUND)

        # Serialize the queryset
        serializer = RestaurantMenuAllSerializer(menu_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

     except RestaurantMenuModel.DoesNotExist:
        return Response("This restaurant doesn't exist", status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(method='GET')
@api_view(["GET"])
def GetAllRestaurantsAAA(request):
    users = RestaurantMenuModel.objects.all()
    serializer = RestaurantMenuAllSerializer(users, many=True)
    return Response(serializer.data)


# returns all the restaurants in homepage
@swagger_auto_schema(method='DELETE')
@api_view(["DELETE"])
def DeleteFood(request,restaurantName,foodName):
    try:
        delFood = RestaurantMenuModel.objects.get(restaurantName=restaurantName, foodName=foodName)
    except RestaurantMenuModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    opertaion = delFood.delete()
    if opertaion:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


# updating restaurant uncritical info by res-admin
@swagger_auto_schema(method='PATCH')
@api_view(["PATCH"])
def updateResInfoView(request , restaurantName):
    try:

        user = siteAdminModel.objects.get(restaurantName=restaurantName)
    except siteAdminModel.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    data_to_update = {}
    if 'restaurantRate' in request.data:
        data_to_update['restaurantRate'] =  (user.restaurantRate*user.restaurantRateNumber + request.data['restaurantRate'])/(user.restaurantRateNumber+1)
        data_to_update['restaurantRateNumber'] = user.restaurantRate + 1
    
    serializer = RestaurantRateSerializer(user, data=data_to_update, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=400)

# create resturant by site admin
@swagger_auto_schema(method='POST', request_body=siteAdminModelSerializer)
@api_view(["POST"])
def CreateRestaurant(request):
    serializer = siteAdminModelSerializer(data=request.data)
    if serializer.is_valid():
        try:
           siteAdminModel.objects.get(restaurantName=request.data["restaurantName"])
        except siteAdminModel.DoesNotExist:
            try:
               siteAdminModel.objects.get(restaurantUsername=request.data["restaurantUsername"])
            except siteAdminModel.DoesNotExist:
               serializer.save()  
            #    print(serializer.instance.restaurantImage)
               copyImages(serializer.instance.restaurantImage)
               return Response("Restaurant profile successfully created", status=status.HTTP_201_CREATED)
            return Response("This username already exist!", status=status.HTTP_401_UNAUTHORIZED)
        return Response("This Restaurant already exist!", status=status.HTTP_401_UNAUTHORIZED)
    return Response("Some fields are missing", status=status.HTTP_400_BAD_REQUEST)

# returns all the restaurants in homepage
@swagger_auto_schema(method='GET')
@api_view(["GET"])
def GetAllRestaurants(request):
    users = siteAdminModel.objects.all()
    serializer = RestaurantAdminGetMenuSerializer(users, many=True)
    return Response(serializer.data)

# returns all the restaurants in homepage
@swagger_auto_schema(method='GET')
@api_view(["GET"])
def GetRestaurantDetail(request,restaurantName):
   try:
        menu_queryset = siteAdminModel.objects.filter(restaurantName=restaurantName)
        # Check if there are any menus with the given restaurantName
        if not menu_queryset.exists():
            return Response("This restaurant doesn't exist", status=status.HTTP_404_NOT_FOUND)
        # Serialize the queryset
        serializer = RestaurantAdminGetMenuSerializer(menu_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
   except RestaurantMenuModel.DoesNotExist:
        return Response("This restaurant doesn't exist", status=status.HTTP_404_NOT_FOUND)

# Delete a selected restaurant
@swagger_auto_schema(method='DELETE')
@api_view(["DELETE"])
def DeleteRestaurant(request,restaurantName):
    try:
        delRes = siteAdminModel.objects.get(restaurantName=restaurantName)
    except siteAdminModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    opertaion = delRes.delete()
    if opertaion:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)

# This function use for authenticate the restaurant admin
@swagger_auto_schema(method='POST', request_body=RestaurantAdminLoginSerializer)
@api_view(["POST"])
def restaurantAdminLoginView(request):
    serializer = RestaurantAdminLoginSerializer(data=request.data)
    if serializer.is_valid():
        try:
         siteAdminModel.objects.get(
            restaurantName=request.data["restaurantUsername"])
        except siteAdminModel.DoesNotExist:
            return Response(f"There is no {request.data['restaurantUsername']}", status=status.HTTP_400_BAD_REQUEST)
        try:
         siteAdminModel.objects.get(
            restaurantUsername=request.data["restaurantUsername"], restaurantPassword=request.data["restaurantPassword"])
        except siteAdminModel.DoesNotExist:
            return Response("Password is incorrect", status=status.HTTP_400_BAD_REQUEST)
         
        user = siteAdminModel.objects.get(restaurantUsername=serializer.data['restaurantUsername'])
        refresh = RefreshToken.for_user(user)
        detail = {}
        detail["restaurantName"] = user.restaurantName
        detail["restaurantDescription"] = user.restaurantDescription
        detail["restaurantType"] = user.restaurantType
        detail["restaurantLocation"] = user.restaurantLocation
        detail["restaurantRate"] = user.restaurantRate
        return Response({"detail":detail, "token": str(refresh.access_token)}, status=status.HTTP_200_OK)
    return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)

# This function use for copy image in front
def copyImages(fileName) :
    fileName=str(fileName).replace('/','\\')
    print(fileName)
    base_address = str(settings.MEDIA_ROOT).replace('Backend\media','Frontend\public\\assets\\backendImage')
    print(base_address)
    source_path = settings.MEDIA_ROOT +f'\{fileName}'
    dest_path = base_address +f'\{fileName}'
    print(settings.MEDIA_ROOT)
    print(source_path)
    print(dest_path)
    shutil.copy(source_path,dest_path)
    # \Frontend\src\\backendImages' +f'\{fileName}
   
       

