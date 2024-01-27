from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('createFood/', view=views.CreateFoodView),
    path('allMenu/<slug:restaurantName>', view=views.allMenuView),
    path('CreateSiteAdmin/',view=views.CreateRestaurant),
    path('GetCreateSiteAdmin/',view=views.GetAllRestaurants),
    path('restaurantAdminLoginView/',view=views.restaurantAdminLoginView),
    path('test/',view=views.GetAllRestaurantsAAA),
    

]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)