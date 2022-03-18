from flask import request
from backend.auth import auth
from backend.models import User
from flask_jwt_extended import create_access_token, create_refresh_token


@auth.post('/token')
def token():
    """route to login user"""
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return {
            'message': {'error': 'wrong credentials'}
        }, 401

    username = auth.username
    password = auth.password

    user = User.query.filter_by(username=username).first()
    if user:
        if user.check_password(password):
            # create tokens if password is correct
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            return {
                'user': {
                    'refresh_token': refresh_token,
                    'access_token': access_token,
                    'username': user.username,
                    'email': user.email,
                    'id': user.id
                }
            }, 200
        else:
            return {
                'message': {'password': 'wrong password'}
            }, 401

    else:
        return {
            'message': {'username': 'user does not exist for given username'}
        }, 404
