from django.urls import path
from . import views

urlpatterns = [
    path('signup/', view=views.signupView),
]
