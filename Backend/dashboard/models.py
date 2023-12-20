from django.db import models

# Create your models here.

class RestaurantAdminMenuModel(models.Model):
    id = models.AutoField(primary_key=True)
    foodName = models.CharField(max_length=50)
    foodPrice = models.IntegerField()
    foodDescription = models.CharField(max_length=100)
    footType = models.EmailField(max_length=50)
    footImage = models.ImageField( blank=False,upload_to='images/')

    def __str__(self):
        return self.foodName
    
# class RestaurantAdminProfileModel(models.Model):
#     id = models.AutoField(primary_key=True)
#     firstName = models.CharField(max_length=50)
#     lastName = models.CharField(max_length=50)
#     phoneNumber = models.CharField(max_length=11)
#     email = models.EmailField(max_length=50)
#     address = models.CharField(max_length=200)
#     password = models.CharField(max_length=200)

#     def __str__(self):
#         return self.firstName+ " " + self.lastName
    
