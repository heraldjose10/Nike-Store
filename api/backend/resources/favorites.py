from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import reqparse, Resource

from backend import db
from backend.models.users import Users as _Users
from backend.models.products import ProductStyles


class Favorites(Resource):
    """method for users favorites"""

    def __init__(self) -> None:
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument(
            'style_id',
            type=int,
            help='style id is required',
            location='json',
            required=True
        )

    method_decorators = {
        'post': [jwt_required()],
        'get': [jwt_required()],
        'patch': [jwt_required()],
        'delete': [jwt_required()]
    }

    def post(self):
        user_id = get_jwt_identity()

        args = self.reqparse.parse_args()
        style_id = args['style_id']

        user = _Users.query.filter_by(id=user_id).first()
        style = ProductStyles.query.filter_by(id=style_id).first()

        user.favorites.append(style)
        db.session.commit()

        return {
            'message': 'item added to favorites'
        }, 201

    def get(self):
        user_id = get_jwt_identity()

        user = _Users.query.filter_by(id=user_id).first()
        favorites = user.favorites
        
        return {
            'items': [fav.get_style_details() for fav in favorites]
        }, 200

    def delete(self):
        user_id = get_jwt_identity()

        args = self.reqparse.parse_args()
        style_id = args['style_id']

        user = _Users.query.filter_by(id=user_id).first()
        style = ProductStyles.query.filter_by(id=style_id).first()

        user.favorites.remove(style)
        db.session.commit()

        return{
            'message': 'item removed from favorites'
        }, 200