# dashboard.models.py

from django.db import models


class RestaurantMenuModel(models.Model):
    id = models.AutoField(primary_key=True)
    foodName = models.CharField(max_length=50)
    foodPrice = models.IntegerField()
    foodDescription = models.CharField(max_length=200)
    foodType = models.CharField(max_length=50)
    foodImage = models.ImageField(blank=False, upload_to='foodImages/')


class siteAdminModel(models.Model):
    id = models.AutoField(primary_key=True)
    restaurantName = models.CharField(max_length=50)
    restaurantDescription = models.CharField(max_length=200)
    restaurantType = models.CharField(max_length=50)
    restaurantImage = models.FileField(upload_to='restaurantImage/')
    restaurantLocation = models.CharField(max_length=50)
    restaurantUsername = models.CharField(max_length=50)
    restaurantPassword = models.CharField(max_length=50)
