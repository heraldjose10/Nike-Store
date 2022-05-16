import json
from base64 import b64encode

from tests import ApiBaseTestCase


class FavoritesTestCase(ApiBaseTestCase):
    """test cases for favorites resource"""

    def test_favorites(self):
        """tests routes for adding, removing, displaying favorites"""

        username = 'user'
        password = 'user_password'
        email = 'user@mail.com'

        payload = json.dumps({
            'username': username,
            'password': password,
            'email': email
        })
        self.test_client.post(
            'api/users',
            headers={"Content-Type": "application/json"},
            data=payload
        )

        # get access token
        credentials = str.encode(f'{username}:{password}')
        auth = b64encode(credentials).decode('ascii')
        headers = {'Authorization': 'Basic %s' % auth}
        response = self.test_client.post(
            'api/token',
            headers=headers
        )
        access_token = response.json['user']['access_token']

        headers = {'Authorization': f'Bearer {access_token}'}

        # add item to favorites
        self.test_client.post(
            'api/favorites',
            headers=headers,
            json={'style_id': 45}
        )

        response = self.test_client.get(
            'api/favorites',
            headers=headers
        )
        self.assertNotEqual(0, len(response.json['items']))
        self.assertEqual(45, response.json['items'][0]['style_id'])
        
        # add another item to favorites
        self.test_client.post(
            'api/favorites',
            headers=headers,
            json={'style_id': 4}
        )

        # remove an item from favorites
        self.test_client.delete(
            'api/favorites',
            headers=headers,
            json={'style_id': 45}
        )

        response = self.test_client.get(
            'api/favorites',
            headers=headers
        )
        self.assertEqual(1, len(response.json['items']))
        self.assertEqual(4, response.json['items'][0]['style_id'])
