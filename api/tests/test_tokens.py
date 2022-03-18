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
