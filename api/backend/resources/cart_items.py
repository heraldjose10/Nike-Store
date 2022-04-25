from flask_restful import Resource, request, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.users import Users as _Users
from backend.models.users import CartItems as _CartItems
from backend.models.products import ProductStyles
from backend import db


class CartItems(Resource):
    """methods for users cart"""

    def __init__(self) -> None:
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument(
            'style_id',
            type=int,
            help='style id is required',
            location='json',
            required=True
        )
        self.reqparse.add_argument(
            'item_count',
            type=int,
            help='item count is required',
            location='json'
        )

    method_decorators = {
        'post': [jwt_required()],
        'get': [jwt_required()],
        'patch': [jwt_required()],
        'delete': [jwt_required()]
    }

    def post(self):
        user_id = get_jwt_identity()

        self.reqparse.replace_argument(
            'item_count',
            type=int,
            help='item count is required',
            location='json',
            required=True
        )

        args = self.reqparse.parse_args()
        style_id = args['style_id']
        item_count = args['item_count']

        user = _Users.query.filter_by(id=user_id).first()
        style = ProductStyles.query.filter_by(id=style_id).first()

        cart_item = _CartItems(item_count=item_count,
                               users=user, product_styles=style)
        db.session.add(cart_item)
        db.session.commit()

        return {
            'message': 'item added to cart',
        }, 201

    def get(self):
        user_id = get_jwt_identity()

        user = _Users.query.filter_by(id=user_id).first()
        return {
            'items': [item.get_item_details() for item in user.product_styles]
        }, 200

    def delete(self):
        user_id = get_jwt_identity()

        args = self.reqparse.parse_args()
        style_id = args['style_id']

        user = _Users.query.filter_by(id=user_id).first()
        user.product_styles.filter_by(product_style_id=style_id).delete()
        db.session.commit()

        return{
            'message': 'item deleted from cart'
        }, 200

    def patch(self):
        user_id = get_jwt_identity()

        self.reqparse.replace_argument(
            'item_count',
            type=int,
            help='item count is required',
            location='json',
            required=True
        )

        args = self.reqparse.parse_args()
        style_id = args['style_id']
        item_count = args['item_count']

        user = _Users.query.filter_by(id=user_id).first()
        item = user.product_styles.filter_by(product_style_id=style_id).first()

        if not item:
            return {
                'message': 'item not in the cart'
            }, 400

        item.item_count = item_count
        db.session.commit()
        return {
            'message': 'item count set'
        }, 200
