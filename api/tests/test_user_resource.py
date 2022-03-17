import json
from tests import ApiBaseTestCase


class UserResourceTestCase(ApiBaseTestCase):
    """test user resource"""

    def test_user_register(self):
        """test user registration route"""

        payload = json.dumps({
            'username': 'userx',
            'password': 'userx_password',
            'email': 'me@mail.com'
        })
        response = self.test_client.post(
            '/api/users', headers={"Content-Type": "application/json"}, data=payload)

        self.assertEqual(201, response.status_code)
        self.assertEqual(int, type(response.json['user']['id']))
        self.assertEqual('user created', response.json['message'])
        self.assertEqual('me@mail.com', response.json['user']['email'])

        response = self.test_client.post(
            '/api/users')
        self.assertEqual(400, response.status_code)
        self.assertEqual('username is required',
                         response.json['message']['username'])

        response = self.test_client.post(
            '/api/users', headers={"Content-Type": "application/json"}, data=payload)
        self.assertEqual(409, response.status_code)
        self.assertEqual('username already taken',
                         response.json['message']['username'])

        payload = json.dumps({
            'username': 'userx1',
            'password': 'userx1_password',
            'email': 'me@mail.com'
        })
        response = self.test_client.post(
            '/api/users', headers={"Content-Type": "application/json"}, data=payload)
        self.assertEqual(409, response.status_code)
        self.assertEqual(
            'an account already exists with this email', response.json['message']['email'])
