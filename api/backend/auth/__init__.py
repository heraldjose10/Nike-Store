from flask import Blueprint

auth = Blueprint('auth', __name__, url_prefix='/api')

from backend.auth import routes