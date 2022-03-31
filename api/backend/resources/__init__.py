from flask_restful import Api
from backend.resources.products import Products, ProductsList, ProductsListFromCategory
from backend.resources.users import Users
from backend.resources.categories import Categories, CategoriesList

api = Api()

# add resources with routes and endpoint names
api.add_resource(Products, '/api/products/<int:id>', endpoint='product')
api.add_resource(ProductsList, '/api/products', endpoint='product_list')
api.add_resource(ProductsListFromCategory, '/api/categories/<int:category_id>/products')

api.add_resource(Users, '/api/users', endpoint='user')
api.add_resource(Users, '/api/users/<string:username>', endpoint='user_get')

api.add_resource(Categories, '/api/categories/<int:id>', endpoint='category')
api.add_resource(CategoriesList, '/api/categories', endpoint='category_list')
