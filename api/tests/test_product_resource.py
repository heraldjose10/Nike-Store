from tests import ApiBaseTestCase


class ProductResourceTestCase(ApiBaseTestCase):
    """test product resource"""

    def test_product_list(self):
        """test products get request"""
        response = self.test_client.get('/api/products')
        response_json = response.json

        self.assertEqual(200, response.status_code)
        self.assertEqual(dict, type(response_json))
        self.assertEqual(dict, type(response_json['links']))
        self.assertEqual(float, type(response_json['items'][0]['price']))
        self.assertNotEqual(0, response_json['total'])
        self.assertEqual(10, len(response_json['items']))

    def test_product_get_with_id(self):
        """test products get request with id"""
        response = self.test_client.get('/api/products/1')
        response_json = response.json

        self.assertEqual(200, response.status_code)
        self.assertEqual(dict, type(response_json))
        self.assertEqual(str, type(response_json['item']['name']))
        self.assertEqual(int, type(response_json['item']['id']))
        self.assertEqual(list, type(response_json['item']['styles']))
