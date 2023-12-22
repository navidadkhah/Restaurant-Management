from django.contrib import admin
from .models import RestaurantAdminMenuModel,RestaurantAdminProfileModel,siteAdminModel,RestaurantAdminModel


# Register your models here.

admin.site.register(RestaurantAdminMenuModel)
admin.site.register(RestaurantAdminProfileModel)
admin.site.register(siteAdminModel)
admin.site.register(RestaurantAdminModel)