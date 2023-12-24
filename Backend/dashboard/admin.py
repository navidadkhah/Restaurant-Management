from django.contrib import admin
from .models import RestaurantAdminMenuModel,RestaurantUpdateInfoModel,siteAdminModel,RestaurantAdminModel


# Register your models here.

admin.site.register(RestaurantAdminMenuModel)
admin.site.register(RestaurantUpdateInfoModel)
admin.site.register(siteAdminModel)
admin.site.register(RestaurantAdminModel)