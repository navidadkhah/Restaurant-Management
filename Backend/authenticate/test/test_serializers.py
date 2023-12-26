from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from authenticate.models import UserModel
from authenticate.serializers import UserSerializer, LoginUserSerializer

class ViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_signup_view(self):
        # Valid signup data
        signup_data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'phoneNumber': '1234567890',
            'email': 'john.doe@example.com',
            'address': '123 Main St, City',
            'password': '123456789'
        }

        # Make a POST request to the signup view
        response = self.client.post('/auth/api/signup/', signup_data, format='json')

        # Check that the response indicates a successful user creation
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that the user was created in the database
        self.assertTrue(UserModel.objects.filter(email='john.doe@example.com').exists())

        # Invalid signup data (email already taken)
        response_duplicate_email = self.client.post('/auth/api/signup/', signup_data, format='json')

        # Check that the response indicates an email already taken error
        self.assertEqual(response_duplicate_email.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_view(self):
        # Create a user for testing login
        user = UserModel.objects.create(
            firstName="John",
            lastName="Doe",
            phoneNumber="1234567890",
            email="john.doe@example.com",
            address="123 Main St, City",
            password="123456789"
        )

        # Valid login data
        login_data = {
            'email': 'john.doe@example.com',
            'password': '123456789'
        }

        # Make a POST request to the login view
        response = self.client.post('/auth/api/login/', login_data, format='json')

        # Check that the response indicates a successful login
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response includes the user details and a token
        self.assertIn('detail', response.data)
        self.assertIn('token', response.data)

        # Invalid login data (wrong password)
        login_data_wrong_password = {
            'email': 'john.doe@example.com',
            'password': 'ytdfyd5idrdjturdeed'
        }

        # Make a POST request to the login view with incorrect password
        response_wrong_password = self.client.post('/auth/api/login/', login_data_wrong_password, format='json')

        # Check that the response indicates an incorrect password error
        self.assertEqual(response_wrong_password.status_code, status.HTTP_400_BAD_REQUEST)

    def test_all_users_view(self):
        # Create some users for testing the all users view
        user1 = UserModel.objects.create(
            firstName="John",
            lastName="Doe",
            phoneNumber="1234567890",
            email="john.doe@example.com",
            address="123 Main St, City",
            password="123456789"
        )
        user2 = UserModel.objects.create(
            firstName="Jane",
            lastName="Doe",
            phoneNumber="9876543210",
            email="jane.doe@example.com",
            address="456 Second St, Town",
            password="123456789"
        )

        # Make a GET request to the all users view
        response = self.client.get('/auth/api/users/')

        # Check that the response indicates a successful retrieval of all users
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response data contains details of all users
        self.assertEqual(len(response.data), 2)