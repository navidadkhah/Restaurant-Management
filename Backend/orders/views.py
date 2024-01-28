from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Orders, Reservations
from authenticate.models import UserModel
from .serializer import OrdersSerializer, ReservationsSerializer
from drf_yasg.utils import swagger_auto_schema
from django.conf import settings
from django.core.mail import send_mail

# Get all orders from one restaurant
@swagger_auto_schema(
    method='GET'
)
@api_view(["GET"])
def order_list_restaurants_view(request,restaurantName):
    try:
        menu_queryset = Orders.objects.filter(restaurantName=restaurantName)
        # Check if there are any menus with the given restaurantName
        if not menu_queryset.exists():
            return Response("This restaurant doesn't exist", status=status.HTTP_404_NOT_FOUND)
        # Serialize the queryset
        serializer = OrdersSerializer(menu_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Orders.DoesNotExist:
        return Response("This restaurant doesn't exist", status=status.HTTP_404_NOT_FOUND)

# Get all orders from one user
@swagger_auto_schema(
    method='GET'
)
@api_view(["GET"])
def order_list_users_view(request,userPhone):
    try:
        menu_queryset = Orders.objects.filter(userPhone=userPhone)
        # Check if there are any menus with the given restaurantName
        if not menu_queryset.exists():
            return Response("This user doesn't exist", status=status.HTTP_404_NOT_FOUND)
        # Serialize the queryset
        serializer = OrdersSerializer(menu_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Orders.DoesNotExist:
        return Response("This user doesn't exist", status=status.HTTP_404_NOT_FOUND)
   
# Post an orders 
@swagger_auto_schema(
    method='POST',
    request_body=OrdersSerializer,
)
@api_view(["POST"])
def order_create_view(request):
    # Authenticate user based on email
    user_email = request.data.get('userEmail')
    user = get_object_or_404(UserModel, email=user_email)
    # Create order
    request.data['userEmail'] = user.email  # Update userEmail with authenticated user's email
    serializer = OrdersSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        resName = serializer.data['restaurantName']
        orders = serializer.data['orders'].split()
        allorders = ''
        for i in range(len(orders)):
            allorders+=orders[i] + " "
        subject = f'Order from {resName}'
        message = f'Hi {user.firstName + " " + user.lastName}, thank you for your Order!\nYour order will be there really soon, Enjoy it.\nyour orders is as follows:\n{allorders}\n For more info please contact the restaurant.\nwith love from tameshk💜'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user_email, ]
        send_mail( subject, message, email_from, recipient_list )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all orders from one user
@swagger_auto_schema(
    method='GET'
)
@api_view(["GET"])
def reservation_user_list_view(request,userPhone):
    try:
        menu_queryset = Reservations.objects.filter(userPhone=userPhone)
        # Check if there are any menus with the given restaurantName
        if not menu_queryset.exists():
            return Response("This user doesn't exist", status=status.HTTP_404_NOT_FOUND)
        # Serialize the queryset
        serializer = ReservationsSerializer(menu_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Reservations.DoesNotExist:
        return Response("This user doesn't exist", status=status.HTTP_404_NOT_FOUND)

# Get all orders from one restaurant
@swagger_auto_schema(
    method='GET'
)
@api_view(["GET"])
def reservation_restaurant_list_view(request,restaurantName):
     try:
        menu_queryset = Reservations.objects.filter(restaurantName=restaurantName)
        # Check if there are any menus with the given restaurantName
        if not menu_queryset.exists():
            return Response("This restaurant doesn't exist", status=status.HTTP_404_NOT_FOUND)
        # Serialize the queryset
        serializer = ReservationsSerializer(menu_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
     except Reservations.DoesNotExist:
        return Response("This restaurant doesn't exist", status=status.HTTP_404_NOT_FOUND)


# Post a reservasion
@swagger_auto_schema(
    method='POST',
    request_body=ReservationsSerializer,
)
@api_view(["POST"])
def reservation_create_view(request):
    # Authenticate user based on email
    user_email = request.data.get('userEmail')
    user = get_object_or_404(UserModel, email=user_email)

    # Create reservation
    request.data['userEmail'] = user_email  # Update userEmail with authenticated user's email
    serializer = ReservationsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        resName = serializer.data['restaurantName']
        subject = f'Reservation for {resName}'
        message = f'Hi {user.firstName + " " + user.lastName}, thank you for your Reservations!\nthe table you requested is reserved for you today. the possible delay time is 15 minute and the table is at your service for 2 hours. For more info please contact the restaurant.\nwith love from tameshk💜'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user_email, ]
        send_mail( subject, message, email_from, recipient_list )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
