from rest_framework import serializers
from .models import RestaurantAdminMenuModel,RestaurantAdminProfileModel,siteAdminModel

class RestaurantAdminMenuModelSerializer(serializers.ModelSerializer):
   class Meta:
      model = RestaurantAdminMenuModel
      fields = '__all__'

class RestaurantAdminProfileModelSerializer(serializers.ModelSerializer):
   class Meta:
      # data base model should be changed to site admin once it is defiend
      model = siteAdminModel
      fields = ('restaurantDescription', 'restaurantImage')


# showing all restaurants info's in homepage
class RestaurantAdminGetMenuSerializer(serializers.ModelSerializer):
   class Meta:
      model = siteAdminModel
      fields = ('restaurantName','restaurantDescription','restaurantType','restaurantImage','restaurantLocation')

# register restaurant admin
class RestaurantAdminLoginSerializer(serializers.ModelSerializer):
   class Meta:
      model = siteAdminModel
      fields = ('restaurantUsername','restaurantPassword')

# creating a new restaurant
class siteAdminModelSerializer(serializers.ModelSerializer):
   class Meta:
      model = siteAdminModel
      fields = '__all__'