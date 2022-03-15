from flask_restful import Resource
from backend import api

products = [
    {'id': 1, 'name': 'Air Force 1', 'price': '8999'},
    {'id': 2, 'name': 'Nike Strada', 'price': '1999'},
    {'id': 3, 'name': 'Air Jordan \'86', 'price': '13999'}
]


class Product(Resource):

    def get(self, id):
        for product in products:
            if product['id'] == id:
                return product


class ProductList(Resource):

    def get(self):
        return products


api.add_resource(Product, '/api/products/<int:id>', endpoint='product')
api.add_resource(ProductList, '/api/products', endpoint='product_list')