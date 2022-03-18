from flask_restful import Api
from backend.resources.products import Products, ProductsList
from backend.resources.users import Users

api = Api()

# add resources with routes and endpoint names
api.add_resource(Products, '/api/products/<int:id>', endpoint='product')
api.add_resource(ProductsList, '/api/products', endpoint='product_list')

api.add_resource(Users, '/api/users', endpoint='user')
api.add_resource(Users, '/api/users/<string:username>', endpoint='user_get')
