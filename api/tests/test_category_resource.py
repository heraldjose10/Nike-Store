from tests import ApiBaseTestCase


class CategoryResourceTestCase(ApiBaseTestCase):
    """test cases for category resource"""

    def test_categories_list(self):
        response = self.test_client.get('/api/categories')
        response_json = response.json

        self.assertEqual(200, response.status_code)
        self.assertEqual(dict, type(response_json))
        self.assertEqual(int, type(response_json['total']))
        self.assertEqual(str, type(response_json['items'][0]['name']))
        self.assertNotEqual(0, response_json['total'])
        self.assertEqual(12, len(response_json['items']))

    def test_get_category(self):
        response = self.test_client.get('/api/categories/3')
        reponse_json = response.json

        self.assertEqual(200, response.status_code)
        self.assertEqual(dict, type(reponse_json))
        self.assertEqual(3, reponse_json['item']['id'])
