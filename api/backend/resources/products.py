from flask import request
from flask_restful import Resource, reqparse
from backend.models.products import Products as _Products
from utils.products import make_products_array


class Products(Resource):
    """methods for products resource"""

    def get(self, id):
        """return a product resource"""
        product = _Products.query.filter_by(id=id).first()

        product_styles_array = []

        for style in product.product_styles:
            product_styles_array.append({
                'colour': style.colour,
                'style_name': style.style_name,
                'images': [image.image_url for image in style.images]
            })

        return {
            'item': {
                'id': product.id,
                'name': product.name,
                'price': float(product.price),
                'short_description': product.short_description,
                'long_description': product.long_description,
                'styles': product_styles_array
            }
        }, 200


class ProductsList(Resource):
    """methods for list of products"""

    def __init__(self) -> None:
        # parser for parsing request params
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument(
            'limit', type=int, help='limit must be a integer', location='args')
        self.reqparse.add_argument(
            'offset', type=int, help='offset must be a integer', location='args')
        self.reqparse.add_argument(
            'query', type=str, help='query must be a string', location='args')

    def get(self):
        """return list of products"""
        args = self.reqparse.parse_args()
        per_page = args['limit'] or 10
        current_page = args['offset'] or 1
        query = args['query']

        if query:
            products = _Products.query.filter(_Products.name.like(f'%{query}%')).paginate(
                page=current_page, per_page=per_page
            )
        else:
            products = _Products.query.order_by(_Products.price.desc()).paginate(
                page=current_page, per_page=per_page)

        products_array = make_products_array(products, request.base_url)

        return {
            'items': products_array,
            'links': {
                'next': f'{request.base_url}?limit={per_page}&offset={products.next_num if products.has_next else None}',
                'self': f'{request.base_url}?limit={per_page}&offset={current_page}',
                'prev': f'{request.base_url}?limit={per_page}&offset={products.prev_num}' if products.has_prev else None
            },
            'total': products.query.count()
        }, 200


class ProductsListFromCategory(Resource):
    """method for list of product resources in a category"""

    def __init__(self) -> None:
        # request parser to parse request params
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument(
            'limit', type=int, help='limit must be a integer', location='args')
        self.reqparse.add_argument(
            'offset', type=int, help='offset must be a integer', location='args')

    def get(self, category_id):
        """return list of products in a category"""
        args = self.reqparse.parse_args()
        per_page = args['limit'] or 10
        current_page = args['offset'] or 1

        products = _Products.query.filter_by(product_category_id=category_id).paginate(
            page=current_page, per_page=per_page)

        products_array = make_products_array(products, request.base_url)

        return {
            'items': products_array,
            'links': {
                'next': f'{request.base_url}?limit={per_page}&offset={products.next_num}' if products.has_next else None,
                'self': f'{request.base_url}?limit={per_page}&offset={current_page}',
                'prev': f'{request.base_url}?limit={per_page}&offset={products.prev_num}' if products.has_prev else None
            },
            'total': _Products.query.filter_by(product_category_id=category_id).count()
        }
