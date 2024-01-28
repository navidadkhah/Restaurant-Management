from django.urls import path
from . import views

urlpatterns = [
    path('Orders/restaurants/<slug:restaurantName>', view=views.order_list_restaurants_view , name='OrderResListView'),
    path('Orders/users/<slug:userPhone>', view=views.order_list_users_view , name='OrderUserListView'),
    path('Reservations/restaurants/<slug:restaurantName>', view=views.reservation_restaurant_list_view, name='ReservationResListView'),
    path('Reservations/users/<slug:userPhone>', view=views.reservation_user_list_view, name='ReservationUserListView'),
    path('CreateOrders/', view=views.order_create_view , name='CreateOrder'),
    path('CreateReservation/',view=views.reservation_create_view, name='CreateReservation'),

]