from django.db import models

# Create your models here.

class UserModel(models.Model):
    id = models.AutoField(primary_key=True)
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

# {
#     "email": "nndfd@ffv.com",
#     "password": "dfdfd"
# }


# {
#     "email": "nnd1380@gm33ail.com",
#     "password": "dfdfd"
# }
