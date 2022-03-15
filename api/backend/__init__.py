from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import configs

db = SQLAlchemy()
migrate = Migrate()


app = Flask(__name__)
app.config.from_object(configs['development'])
db.init_app(app)
migrate.init_app(app, db)

from backend import routes, models