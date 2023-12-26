# dashboard.models.py

from django.db import models

class SingletonMeta(models.base.ModelBase):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]

class SingletonModel(models.Model, metaclass=SingletonMeta):
    class Meta:
        abstract = True

class RestaurantMenuModel(SingletonModel):
    foodName = models.CharField(max_length=50)
    foodPrice = models.IntegerField()
    foodDescription = models.CharField(max_length=200)
    foodType = models.CharField(max_length=50)
    foodImage = models.ImageField(blank=False, upload_to='foodImages/')

    def __str__(self):
        return self.foodName

class siteAdminModel(SingletonModel):
    restaurantName = models.CharField(max_length=50)
    restaurantDescription = models.CharField(max_length=200)
    restaurantType = models.CharField(max_length=50)
    restaurantImage = models.FileField(upload_to='restaurantImage/')
    restaurantLocation = models.CharField(max_length=50)
    restaurantUsername = models.CharField(max_length=50)
    restaurantPassword = models.CharField(max_length=50)

    def __str__(self):
        return self.restaurantName