from django.contrib import admin
from .models import RestaurantAdminMenuModel,RestaurantAdminProfileModel


# Register your models here.

admin.site.register(RestaurantAdminMenuModel)
admin.site.register(RestaurantAdminProfileModel)