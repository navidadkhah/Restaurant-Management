from django.db import models

# Create your models here.
# this model creates order model in database for placing an orders 
class Orders(models.Model):
    id = models.AutoField(primary_key=True)
    userEmail = models.EmailField(max_length=50)
    restaurantName = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add = True)
    Price = models.IntegerField()
    orders = models.CharField(max_length = 2000)
    

# this model creates reservation model in database for placing a reservation
class Reservations(models.Model):
    id = models.AutoField(primary_key=True)
    userEmail = models.EmailField(max_length=50)
    restaurantName = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add = True)
    place = models.CharField(max_length=50) # its value should be either outside or inside
    

    