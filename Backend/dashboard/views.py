from django.shortcuts import render
from dashboard.models import RestaurantMenuModel, siteAdminModel
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RestaurantMenuModelSerializer,RestaurantAdminProfileModelSerializer,RestaurantAdminLoginSerializer,siteAdminModelSerializer, RestaurantAdminGetMenuSerializer
from drf_yasg.utils import swagger_auto_schema
from django.conf import settings
import shutil

# create food by restaurant admin
@swagger_auto_schema(method='POST', request_body=RestaurantMenuModelSerializer)
@api_view(["POST"])
def CreateFoodView(request):
    serializer = RestaurantMenuModelSerializer(data=request.data)
    if serializer.is_valid():
        try:
           RestaurantMenuModel.objects.get(foodName=request.data["foodName"])
        except RestaurantMenuModel.DoesNotExist:
           serializer.save()
           return Response("Food successfully created", status=status.HTTP_201_CREATED)
        return Response("This food name is already exists!", status=status.HTTP_401_UNAUTHORIZED)
    return Response("Some field is missing", status=status.HTTP_400_BAD_REQUEST)

# get all restaurant's menu 
@swagger_auto_schema(method='GET')
@api_view(["GET"])
def allMenuView(request):
    users = RestaurantMenuModel.objects.all()
    serializer = RestaurantMenuModelSerializer(users, many=True)
    return Response(serializer.data)


# # updating restaurant uncritical info by res-admin
# @swagger_auto_schema(method='PATCH')
# @api_view(["PATCH"])
# def updateResInfoView(request , pk):
#     try:
#         user = RestaurantAdminProfileModel.objects.get(pk=pk)
#     except RestaurantAdminProfileModel.DoesNotExist:
#         return Response({"error": "User not found"}, status=404)

#     data_to_update = {}
#     if 'restaurantDescription' in request.data:
#         data_to_update['restaurantDescription'] = request.data['restaurantDescription']
#     if 'restaurantImage' in request.data:
#         data_to_update['restaurantImage'] = request.data['restaurantImage']

#     serializer = RestaurantAdminProfileModelSerializer(user, data=data_to_update, partial=True)
    
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
    
#     return Response(serializer.errors, status=400)

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



def copyImages(fileName) :
    fileName=str(fileName).replace('/','\\')
    base_address = str(settings.MEDIA_ROOT).replace('Backend\media','Frontend\src\\backendImage')
    print(base_address)
    source_path = settings.MEDIA_ROOT +f'\{fileName}'
    dest_path = base_address +f'\{fileName}'
    print(settings.MEDIA_ROOT)
    print(source_path)
    print(dest_path)
    shutil.copy(source_path,dest_path)
    # \Frontend\src\\backendImages' +f'\{fileName}
   
       

