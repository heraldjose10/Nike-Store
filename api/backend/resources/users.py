from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.users import Users
from backend import db


class Users(Resource):
    """methods for Users resource"""

    method_decorators = {
        'get': [jwt_required()]
    }

    def __init__(self) -> None:
        # create a request parser for parsing
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument(
            'username', required=True, location='json', help='username is required')
        self.reqparse.add_argument(
            'password', required=True, location='json', help='password is required')
        self.reqparse.add_argument(
            'email', required=True, location='json', help='email is required')

    def post(self):
        """create a new User resource"""
        args = self.reqparse.parse_args()
        # get json data from request body
        username = args['username']
        password = args['password']
        email = args['email']

        if Users.query.filter_by(username=username).first() is not None:
            return {
                'message': {'username': 'username already taken'}
            }, 409

        if Users.query.filter_by(email=email).first() is not None:
            return {
                'message': {'email': 'an account already exists with this email'}
            }, 409

        user = Users(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return {
            'message': 'user created',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, 201

    def get(self, username=None):
        """get current logged in user"""
        user_id = get_jwt_identity()
        user = Users.query.filter_by(id=user_id).first()
        if user.username != username:
            return {
                'message': {'username': 'username mismatch'}
            }, 403
        else:
            return {
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }
