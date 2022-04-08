from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin

from config import configs

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()
cors = CORS()


def create_app(config_type='development'):
    """Function for creating app object
    
    Parameters
    ----------
    config_type : server configuration type
    """
    app = Flask(__name__)
    app.config.from_object(configs[config_type])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    from backend.resources import api
    api.init_app(app)
    
    from backend.auth import auth as bp
    app.register_blueprint(bp)

    return app