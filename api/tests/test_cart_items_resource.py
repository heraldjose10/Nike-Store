import json
from tests import ApiBaseTestCase
from base64 import b64encode


class CartItemsTestCase(ApiBaseTestCase):
    """test cases for cart item resources"""

    def test_cart_item(self):
        """test routes for adding, deleting and updating a cart item"""
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

        # add an item to cart
        self.test_client.post(
            'api/cartitems',
            headers=headers,
            json={'style_id': 12, 'item_count': 2}
        )

        response = self.test_client.get(
            'api/cartitems',
            headers=headers
        )
        self.assertNotEqual(0, len(response.json['items']))
        self.assertEqual(2, response.json['items'][0]['item_count'])

        # delete an item from cart
        self.test_client.delete(
            'api/cartitems',
            headers=headers,
            json={'style_id': 12}
        )
        response = self.test_client.get(
            'api/cartitems',
            headers=headers
        )
        self.assertEqual(0, len(response.json['items']))

        # add an item and update it
        self.test_client.post(
            'api/cartitems',
            headers=headers,
            json={'style_id': 10, 'item_count': 2}
        )
        self.test_client.patch(
            'api/cartitems',
            headers=headers,
            json={'style_id': 10, 'item_count': 4}
        )
        response = self.test_client.get(
            'api/cartitems',
            headers=headers
        )
        self.assertNotEqual(0, len(response.json['items']))
        self.assertEqual(10, response.json['items'][0]['style_id'])
        self.assertEqual(4, response.json['items'][0]['item_count'])