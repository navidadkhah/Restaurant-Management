from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from authenticate.models import UserModel

class ViewTestCase(TestCase):
    def setUp(self):
        # Create a test user for login and allusers tests
        self.user = UserModel.objects.create(
            firstName="John",
            lastName="Doe",
            phoneNumber="9876543210",
            email="john.doe@example.com",
            address="789 New St",
            password="hashed_password"
        )

    def test_signup_view(self):
        signup_data = {
            'firstName': 'Jane',
            'lastName': 'Smith',
            'phoneNumber': '1234567890',
            'email': 'jane.smith@example.com',
            'address': '456 Oak St, Town',
            'password': 'password123'
        }

        response = self.client.post(reverse('signupView'), signup_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that the user was created in the database
        self.assertTrue(UserModel.objects.filter(email='jane.smith@example.com').exists())

        # Test with duplicate email
        response_duplicate_email = self.client.post(reverse('signupView'), signup_data, format='json')
        self.assertEqual(response_duplicate_email.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_view(self):
        login_data = {
            'email': 'john.doe@example.com',
            'password': 'hashed_password'
        }

        response = self.client.post(reverse('loginView'), login_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('detail', response.data)
        self.assertIn('token', response.data)

        # Test with incorrect password
        login_data_wrong_password = {
            'email': 'john.doe@example.com',
            'password': 'incorrect_password'
        }

        response_wrong_password = self.client.post(reverse('loginView'), login_data_wrong_password, format='json')
        self.assertEqual(response_wrong_password.status_code, status.HTTP_400_BAD_REQUEST)

    def test_allusers_view(self):
        response = self.client.get(reverse('allusers'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)