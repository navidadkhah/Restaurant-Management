from django.db import models

# Create your models here.

class UserModel(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    phoneNumber = models.CharField(max_length=11)
    email = models.EmailField(max_length=50)
    address = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

    def __str__(self):
        return self.firstName+ " " + self.lastName
    

# {
#     "firstName": "nawid",
#     "lastName": "dadkhah",
#     "phoneNumber": "09109207102",
#     "email": "nnd1380@gmail.com",
#     "address": "shahrara",
#     "password": "12345"
# }
