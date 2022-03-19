from flask import request
from backend.auth import auth
from backend.models.users import Users
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity


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

    user = Users.query.filter_by(username=username).first()
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


@auth.post('/token/refresh')
@jwt_required(refresh=True)
def refresh():
    """route to refresh token"""
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    return {
        'user': {
            'access_token': access_token
        }
    }, 200
