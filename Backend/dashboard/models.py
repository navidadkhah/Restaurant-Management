from django.db import models

# Create your models here.

class RestaurantAdminMenuModel(models.Model):
    id = models.AutoField(primary_key=True)
    # restaurantName = models.CharField(max_length=50)
    foodName = models.CharField(max_length=50)
    foodPrice = models.IntegerField()
    foodDescription = models.CharField(max_length=200)
    foodType = models.CharField(max_length=50)
    foodImage = models.ImageField( blank=False,upload_to='foodImages/')

    def __str__(self):
        return self.foodName
    
# in this section we can update the uncritical restaurant info
class RestaurantAdminProfileModel(models.Model):
    id = models.AutoField(primary_key=True)
    restaurantDescription = models.CharField(max_length=200)
    restaurantImage = models.ImageField( blank=False,upload_to='restaurantImages/')

# defining restaurant info including username and password for it's admin
class siteAdminModel(models.Model):
    id = models.AutoField(primary_key=True)
    restaurantName = models.CharField(max_length=50)
    restaurantDescription = models.CharField(max_length=200)
    restaurantType = models.CharField(max_length=50)
    restaurantImage = models.FileField(upload_to='restaurantImages/')
    restaurantLocation = models.CharField(max_length = 50)
    restaurantUsername = models.CharField(max_length = 50)
    restaurantPassword = models.CharField(max_length = 50)

    def __str__(self):
        return self.restaurantName


    
