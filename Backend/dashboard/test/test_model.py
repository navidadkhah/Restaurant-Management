from django.test import TestCase
from dashboard.models import RestaurantMenuModel, siteAdminModel
from django.core.files.uploadedfile import SimpleUploadedFile

class ModelTestCase(TestCase):
    def setUp(self):
        # Create a sample restaurant for testing
        self.restaurant = siteAdminModel.objects.create(
            restaurantName="Restaurant",
            restaurantDescription="A test restaurant",
            restaurantType="Test Type",
            restaurantImage=SimpleUploadedFile("test_image.jpg", b"file_content", content_type="image/jpeg"),
            restaurantLocation="Test Location",
            restaurantUsername="res_username",
            restaurantPassword="test_password"
        )

        # Create a sample menu item for testing
        self.menu_item = RestaurantMenuModel.objects.create(
            foodName="some Food",
            foodPrice=10,
            foodDescription="A test food item",
            foodType="Test Type",
            foodImage=SimpleUploadedFile("food_image.jpg", b"file_content", content_type="image/jpeg")
        )

    def test_restaurant_model(self):
        # Test the __str__ method of the restaurant model
        self.assertEqual(str(self.restaurant), "Restaurant")

        # Test that the restaurant model fields are saved correctly
        self.assertEqual(self.restaurant.restaurantName, "Restaurant")
        self.assertEqual(self.restaurant.restaurantDescription, "A test restaurant")
        self.assertEqual(self.restaurant.restaurantType, "Test Type")
        self.assertEqual(self.restaurant.restaurantLocation, "Test Location")
        self.assertEqual(self.restaurant.restaurantUsername, "res_username")
        self.assertEqual(self.restaurant.restaurantPassword, "test_password")

    def test_menu_item_model(self):
        # Test the __str__ method of the menu item model
        self.assertEqual(str(self.menu_item), "some Food")

        # Test that the menu item model fields are saved correctly
        self.assertEqual(self.menu_item.foodName, "some Food")
        self.assertEqual(self.menu_item.foodPrice, 10)
        self.assertEqual(self.menu_item.foodDescription, "A test food item")
        self.assertEqual(self.menu_item.foodType, "Test Type")

    def test_menu_item_image_upload(self):
        # Test that the menu item image is uploaded and accessible
        self.assertIsNotNone(self.menu_item.foodImage)
        self.assertTrue(self.menu_item.foodImage.name.startswith('foodImages/'))

    def test_restaurant_image_upload(self):
        # Test that the restaurant image is uploaded and accessible
        self.assertIsNotNone(self.restaurant.restaurantImage)
        self.assertTrue(self.restaurant.restaurantImage.name.startswith('restaurantImage/'))
