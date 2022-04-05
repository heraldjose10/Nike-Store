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

    def test_product_list_from_category(self):
        """test products list in a particular category"""
        response = self.test_client.get('/api/categories/1/products?limit=40')
        response_json = response.json

        self.assertEqual(200, response.status_code)
        self.assertEqual(dict, type(response_json))
        self.assertEqual(dict, type(response_json['links']))
        self.assertEqual(float, type(response_json['items'][0]['price']))
        self.assertNotEqual(0, response_json['total'])
        self.assertEqual(40, len(response_json['items']))

    def test_products_search(self):
        """test the search functionality of products resource"""
        response = self.test_client.get('/api/products?query=retro')
        response_json = response.json

        self.assertEqual(200, response.status_code)
        self.assertEqual(dict, type(response_json))
        self.assertEqual(dict, type(response_json['links']))
        self.assertEqual(float, type(response_json['items'][0]['price']))
        self.assertNotEqual(0, response_json['total'])
