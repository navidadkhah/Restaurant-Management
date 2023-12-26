
from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from dashboard.models import RestaurantMenuModel, siteAdminModel

class ViewTestCase(TestCase):
    def setUp(self):
        # Create a sample restaurant for testing
        self.restaurant = siteAdminModel.objects.create(
            restaurantName="Sample Restaurant",
            restaurantDescription="A test restaurant",
            restaurantType="Test Type",
            restaurantImage=SimpleUploadedFile("test_image.jpg", b"file_content", content_type="image/jpeg"),
            restaurantLocation="Test Location",
            restaurantUsername="test_username",
            restaurantPassword="test_password"
        )

        # Create a sample menu item for testing
        self.menu_item = RestaurantMenuModel.objects.create(
            foodName="Test Food",
            foodPrice=10,
            foodDescription="A test food item",
            foodType="Test Type",
            foodImage=SimpleUploadedFile("food_image.jpg", b"file_content", content_type="image/jpeg")
        )

    def test_create_food_view(self):
        create_food_data = {
            'foodName': 'New Food',
            'foodPrice': 15,
            'foodDescription': 'A new food item',
            'foodType': 'New Type',
            'foodImage': SimpleUploadedFile("new_food_image.jpg", b"file_content", content_type="image/jpeg")
        }

        response = self.client.post(reverse('CreateFoodView'), create_food_data, format='multipart')
        
        print("error")
        print(response.status_code)
        print(response.content)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that the food item was created in the database
        self.assertTrue(RestaurantMenuModel.objects.filter(foodName='New Food').exists())

        # Test with duplicate food name
        response_duplicate_name = self.client.post(reverse('CreateFoodView'), create_food_data, format='multipart')
        self.assertEqual(response_duplicate_name.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_all_menu_view(self):
        response = self.client.get(reverse('allMenuView'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_restaurant_view(self):
        create_restaurant_data = {
            'restaurantName': 'New Restaurant',
            'restaurantDescription': 'A new restaurant',
            'restaurantType': 'New Type',
            'restaurantImage': SimpleUploadedFile("new_restaurant_image.jpg", b"file_content", content_type="image/jpeg"),
            'restaurantLocation': 'New Location',
            'restaurantUsername': 'new_username',
            'restaurantPassword': 'new_password'
        }

        response = self.client.post(reverse('CreateRestaurant'), create_restaurant_data, format='multipart')
        
        print("error 2")
        print(response.status_code)
        print(response.content)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that the restaurant was created in the database
        self.assertTrue(siteAdminModel.objects.filter(restaurantName='New Restaurant').exists())

        # Test with duplicate restaurant name
        response_duplicate_name = self.client.post(reverse('CreateRestaurant'), create_restaurant_data, format='multipart')
        self.assertEqual(response_duplicate_name.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_restaurants_view(self):
        response = self.client.get(reverse('GetAllRestaurants'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
