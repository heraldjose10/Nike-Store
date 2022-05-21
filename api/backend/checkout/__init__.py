from flask import Blueprint

checkout = Blueprint('checkout', __name__)

from backend.checkout import routes