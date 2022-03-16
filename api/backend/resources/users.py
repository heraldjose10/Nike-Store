from flask import request
from flask_restful import Resource
from backend.models import User
from backend import db


class Users(Resource):
    """methods for Users resource"""

    def post(self):
        """create a new User resource"""
        if request.get_json():
            # get json data from request body
            username = request.json['username']
            password = request.json['password']
            email = request.json['email']

            if User.query.filter_by(username=username).first() is not None:
                return {'error': 'username already taken'}, 409

            if User.query.filter_by(email=email).first() is not None:
                return {'error': 'an account already exists with this email'}, 409

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

        else:
            return {'error': 'send json body'}, 400
