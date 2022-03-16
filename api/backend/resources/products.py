from flask_restful import Resource


products = [
    {'id': 1, 'name': 'Air Force 1', 'price': '8999'},
    {'id': 2, 'name': 'Nike Strada', 'price': '1999'},
    {'id': 3, 'name': 'Air Jordan \'86', 'price': '13999'}
]


class Products(Resource):
    """methods for products resource"""

    def get(self, id):
        """return a product resource"""
        for product in products:
            if product['id'] == id:
                return product


class ProductsList(Resource):
    """methods for list of products"""

    def get(self):
        """return list of products"""
        return products
