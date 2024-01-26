from rest_framework import serializers
from .models import Orders,Reservations

# showing order details
class OrdersSerializer(serializers.ModelSerializer):
   class Meta:
      model = Orders
      fields = '__all__'

class ReservationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservations
        fields = '__all__'