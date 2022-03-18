import json
from base64 import b64encode
from tests import ApiBaseTestCase


class TokenTestCase(ApiBaseTestCase):
    """test token routes"""

    def test_token_route(self):
        """test access token route"""
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
        self.assertEqual(200, response.status_code)
        self.assertEqual(str, type(response.json['user']['access_token']))
        self.assertEqual(str, type(response.json['user']['refresh_token']))
        self.assertEqual(username, response.json['user']['username'])
        self.assertEqual(email, response.json['user']['email'])
        self.assertEqual(int, type(response.json['user']['id']))

        # test wrong password
        username_password = str.encode(f'{username}:{password}123')
        auth = b64encode(username_password).decode("ascii")
        headers = {'Authorization': 'Basic %s' % auth}

        response = self.test_client.post(
            '/api/token', headers=headers)
        self.assertEqual(401, response.status_code)
        self.assertEqual('wrong password', response.json['message']['password'])

        # test wrong username
        username_password = str.encode(f'{username}12:{password}')
        auth = b64encode(username_password).decode("ascii")
        headers = {'Authorization': 'Basic %s' % auth}

        response = self.test_client.post(
            '/api/token', headers=headers)
        self.assertEqual(404, response.status_code)
        self.assertEqual('user does not exist for given username', response.json['message']['username'])

    def test_token_refresh_route(self):
        """test route to refresh access token"""
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
        refresh_token = response.json['user']['refresh_token']

        #test refresh route
        headers = {'Authorization': f'Bearer {refresh_token}'}
        response = self.test_client.post('/api/token/refresh', headers=headers)
        self.assertEqual(200, response.status_code)
        self.assertEqual(str, type(response.json['user']['access_token']))
        access_token = response.json['user']['access_token']

        #test refresh route without header
        response = self.test_client.post('/api/token/refresh')
        self.assertEqual(401, response.status_code)
        self.assertEqual('Missing Authorization Header', response.json['msg'])

        # test the route with access_token in header
        headers = {'Authorization': f'Bearer {access_token}'}
        response = self.test_client.post('/api/token/refresh', headers=headers)
        self.assertEqual(422, response.status_code)
        self.assertEqual('Only refresh tokens are allowed', response.json['msg'])
