from flask import request
from backend.auth import auth
from backend.models import User
from flask_jwt_extended import create_access_token, create_refresh_token


@auth.post('/token')
def token():
    """route to login user"""
    if request.get_json():
        username = request.json['username']
        password = request.json['password']

        user = User.query.filter_by(username=username).first()
        if user:
            if user.check_password(password):
                # create tokens if password is correct
                access_token = create_access_token(identity=user.id)
                refresh_token = create_refresh_token(identity=user.id)
                return {
                    'user': {
                        'refresh_token': access_token,
                        'access_token': refresh_token,
                        'username': user.username,
                        'email': user.email
                    }
                }, 200
            else:
                return {'error': 'wrong credentials'}, 401

        else:
            return {'error': 'user does not exist'}, 404

    else:
        return {'error': 'send json body'}, 400
