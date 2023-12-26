from django.test import TestCase
from authenticate.models import UserModel

class UserModelTestCase(TestCase):
    def setUp(self):
        # Creating a sample user for testing
        self.user = UserModel.objects.create(
            firstName="John",
            lastName="Doe",
            phoneNumber="1234567890",
            email="john.doe@example.com",
            address="123 Main St, City",
            password="13141516"  
        )

    def test_user_model_str(self):
        # Test the __str__ method of the UserModel
        expected_str = f"{self.user.firstName} {self.user.lastName}"
        self.assertEqual(str(self.user), expected_str)

    def test_user_model_fields(self):
        # Test the individual fields of the UserModel
        self.assertEqual(self.user.firstName, "John")
        self.assertEqual(self.user.lastName, "Doe")
        self.assertEqual(self.user.phoneNumber, "1234567890")
        self.assertEqual(self.user.email, "john.doe@example.com")
        self.assertEqual(self.user.address, "123 Main St, City")



