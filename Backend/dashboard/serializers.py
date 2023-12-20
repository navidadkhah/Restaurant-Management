from rest_framework import serializers
from .models import RestaurantAdminMenuModel

class RestaurantAdminMenuModelSerializer(serializers.ModelSerializer):
   class Meta:
      model = RestaurantAdminMenuModel
      fields = '__all__'
