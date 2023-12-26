from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('createFood/', view=views.CreateFoodView , name= 'CreateFoodView'),
    path('allMenu/', view=views.allMenuView , name= 'allMenuView'),
    path('CreateSiteAdmin/',view=views.CreateRestaurant , name='CreateRestaurant'),
    path('GetCreateSiteAdmin/',view=views.GetAllRestaurants, name= 'GetAllRestaurants'),
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)