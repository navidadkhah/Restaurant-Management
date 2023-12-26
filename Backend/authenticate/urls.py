from django.urls import path
from . import views

urlpatterns = [
    path('signup/', view=views.signupView , name='signupView'),
    path('login/', view=views.loginView, name='loginView'),
    path('users/', view=views.allusers, name='allusers'),
]
