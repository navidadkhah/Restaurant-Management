from django.urls import path
from . import views

urlpatterns = [
    path('Orders/', view=views.order_list_view , name='OrderListView'),
    path('CreateOrders/', view=views.order_create_view , name='CreateOrder'),
    path('Reservations/', view=views.reservation_list_view, name='ReservationListView'),
    path('CreateReservation/',view=views.reservation_create_view, name='CreateReservation'),

]