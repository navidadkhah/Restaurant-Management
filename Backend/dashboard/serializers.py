from rest_framework import serializers
from .models import RestaurantAdminMenuModel,RestaurantAdminProfileModel

class RestaurantAdminMenuModelSerializer(serializers.ModelSerializer):
   class Meta:
      model = RestaurantAdminMenuModel
      fields = '__all__'

class RestaurantAdminProfileModelSerializer(serializers.ModelSerializer):
   class Meta:
      # data base model should be changed to site admin once it is defiend
      model = RestaurantAdminProfileModel
      fields = ['restaurantDescription', 'restaurantImage']