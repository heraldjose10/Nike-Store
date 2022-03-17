import json
from tests import ApiBaseTestCase


class TokenTestCase(ApiBaseTestCase):
    """test token routes"""

    def test_token_route(self):
        """test access token route"""
        # register a user
        payload = json.dumps({
            'username': 'userx',
            'password': 'userx_password',
            'email': 'me@mail.com'
        })
        response = self.test_client.post(
            '/api/users', headers={"Content-Type": "application/json"}, data=payload)

        # test token route
        payload = json.dumps({
            'username': 'userx',
            'password': 'userx_password'
        })
        response = self.test_client.post(
            '/api/token', headers={"Content-Type": "application/json"}, data=payload)
        self.assertEqual(200, response.status_code)
        self.assertEqual(str, type(response.json['user']['access_token']))
        self.assertEqual('userx', response.json['user']['username'])
        self.assertEqual('me@mail.com', response.json['user']['email'])
