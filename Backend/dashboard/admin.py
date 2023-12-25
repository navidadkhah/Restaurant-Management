from django.contrib import admin
from .models import RestaurantMenuModel,siteAdminModel


# Register your models here.

admin.site.register(RestaurantMenuModel)
admin.site.register(siteAdminModel)