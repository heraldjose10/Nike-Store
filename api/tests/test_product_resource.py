from tests import ApiBaseTestCase


class ProductResourceTestCase(ApiBaseTestCase):
    """test product resource"""

    def test_product_list(self):
        """test products get request"""
        response = self.test_client.get('/api/products')
        self.assertEqual(200, response.status_code)
        self.assertEqual(list, type(response.json))

    def test_product_get_with_id(self):
        """test products get request with id"""
        response = self.test_client.get('/api/products/1')
        self.assertEqual(200, response.status_code)
        self.assertEqual(dict, type(response.json))
        self.assertEqual(str, type(response.json['name']))
        self.assertEqual(int, type(response.json['id']))
