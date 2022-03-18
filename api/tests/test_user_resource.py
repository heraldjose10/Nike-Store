import json
from base64 import b64encode
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

    def test_get_current_user(self):
        """test route to get logged in user"""
        username = 'userx'
        password = 'userx_password'
        email = 'me@mail.com'
        # register a user
        payload = json.dumps({
            'username': username,
            'password': password,
            'email': email
        })
        response = self.test_client.post(
            '/api/users', headers={"Content-Type": "application/json"}, data=payload)

        # get tokens for user
        username_password = str.encode(f'{username}:{password}') # encode string to byte object

        auth = b64encode(username_password).decode("ascii")
        headers = {'Authorization': 'Basic %s' % auth}

        response = self.test_client.post(
            '/api/token', headers=headers)
        access_token = response.json['user']['access_token']
        user_id = response.json['user']['id']

        # test for access_token
        headers = {'Authorization': f'Bearer {access_token}'}
        response = self.test_client.get(
            f'/api/users/{username}', headers=headers)
        self.assertEqual(200, response.status_code)
        self.assertEqual(email, response.json['user']['email'])
        self.assertEqual(username, response.json['user']['username'])
        self.assertEqual(user_id, response.json['user']['id'])
        
        # test for wrong username
        response = self.test_client.get(
            f'/api/users/{username}1', headers=headers)
        self.assertEqual(403, response.status_code)
        self.assertEqual('username mismatch', response.json['message']['username'])

        # test for wrong token
        headers = {'Authorization': f'Bearer {access_token[:-1]}'}
        response = self.test_client.get(
            f'/api/users/{username}', headers=headers)
        self.assertEqual(422, response.status_code)
        self.assertEqual('Signature verification failed', response.json['msg'])

        response = self.test_client.get(
            f'/api/users/{username}')
        self.assertEqual(401, response.status_code)
        self.assertEqual('Missing Authorization Header', response.json['msg'])
