from django.db import models

# Create your models here.

class RestaurantAdminMenuModel(models.Model):
    id = models.AutoField(primary_key=True)
    foodName = models.CharField(max_length=50)
    foodPrice = models.IntegerField()
    foodDescription = models.CharField(max_length=100)
    foodType = models.EmailField(max_length=50)
    foodImage = models.ImageField( blank=False,upload_to='images/')

    def __str__(self):
        return self.foodName
    # in this section we can update the uncritical restaurant info
class RestaurantAdminProfileModel(models.Model):
    id = models.AutoField(primary_key=True)
    restaurantDescription = models.CharField(max_length=100)
    restaurantImage = models.ImageField( blank=False,upload_to='images/')

    def __str__(self):
        return self.firstName+ " " + self.lastName
    
