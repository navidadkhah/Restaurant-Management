from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from dashboard.models import RestaurantMenuModel, siteAdminModel
from dashboard.serializers import (
    RestaurantMenuModelSerializer,
    RestaurantAdminProfileModelSerializer,
    RestaurantAdminGetMenuSerializer,
    RestaurantAdminLoginSerializer,
    siteAdminModelSerializer,
)

class SerializerTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_restaurant_menu_model_serializer(self):
        # Create a RestaurantMenuModel instance for testing
        food_item = RestaurantMenuModel.objects.create(
            foodName='pisht Food',
            foodPrice=10,
            foodDescription='A delicious pisht food',
            foodType='pisht Type',
            foodImage=SimpleUploadedFile("pisht_food_image.jpg", b"file_content", content_type="image/jpeg")
        )

        # Serialize the instance
        serializer = RestaurantMenuModelSerializer(food_item)

        # Validate the serialized data
        self.assertEqual(serializer.data['foodName'], 'pisht Food')


    def test_restaurant_admin_profile_model_serializer(self):
        # Create a siteAdminModel instance for testing
        admin_profile = siteAdminModel.objects.create(
            restaurantName='x Restaurant',
            restaurantDescription='pisht test restaurant',
            restaurantType='Test Type',
            restaurantImage=SimpleUploadedFile("pisht_restaurant_image.jpg", b"file_content", content_type="image/jpeg"),
            restaurantLocation='pisht Location',
            restaurantUsername='x_admin_user',
            restaurantPassword='pisht_password'
        )

        # Serialize the instance
        serializer = RestaurantAdminProfileModelSerializer(admin_profile)

        self.assertEqual(serializer.data['restaurantName'], 'x Restaurant')
        self.assertEqual(serializer.data['restaurantUsername'], 'x_admin_user')


    def test_site_admin_model_serializer(self):
        # Create data for testing
        data = {
            'restaurantName': 'alo Restaurant',
            'restaurantDescription': 'alo restaurant',
            'restaurantType': 'alo Type',
            'restaurantImage': SimpleUploadedFile("alo_restaurant_image.jpg", b"file_content", content_type="image/jpeg"),
            'restaurantLocation': 'alo Location',
            'restaurantUsername': 'alo_admin_user',
            'restaurantPassword': 'alo_admin_password'
        }

        # Serialize the data
        serializer = siteAdminModelSerializer(data=data)

        # Validate the serializer is valid
        self.assertTrue(serializer.is_valid())

    def test_site_admin_model_serializer_invalid_data(self):
        # Create invalid data for testing (missing required field)
        invalid_data = {
            'restaurantName': 'alo Restaurant',
            'restaurantDescription': 'alo restaurant',
            'restaurantType': 'alo Type',
            'restaurantImage': SimpleUploadedFile("alo_restaurant_image.jpg", b"file_content", content_type="image/jpeg"),
            'restaurantLocation': 'alo Location',
            'restaurantPassword': 'alo_admin_password'
        }

        # Serialize the invalid data
        serializer = siteAdminModelSerializer(data=invalid_data)

        # Validate the serializer is not valid
        self.assertFalse(serializer.is_valid())

