from flask_restful import Resource, reqparse
from backend.models import User
from backend import db


class Users(Resource):
    """methods for Users resource"""

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

        if User.query.filter_by(username=username).first() is not None:
            return {
                'message': {'username': 'username already taken'}
            }, 409

        if User.query.filter_by(email=email).first() is not None:
            return {
                'message': {'email': 'an account already exists with this email'}
            }, 409

        user = User(username=username, email=email)
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
