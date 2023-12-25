from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('createFood/', view=views.CreateFoodView),
    path('allMenu/', view=views.allMenuView),
    path('updateRestaurant/<int:pk>/', view=views.updateResInfoView),
    path('CreateRestaurantAdmin/', view=views.CreateRestaurantAdmin),
    path('CreateSiteAdmin/',view=views.CreateRestaurant),
    path('GetCreateSiteAdmin/',view=views.GetAllRestaurants),
    path('GetRestaurantAdmin/',view=views.GetRestaurantAdmin)
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)