from flask import Blueprint

checkout = Blueprint('checkout', __name__, url_prefix='/api')

from backend.checkout import routes