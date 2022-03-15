from datetime import datetime
from backend import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(64), index = True, nullable = False)
    email = db.Column(db.String(128), index = True, unique = True, nullable = False)
    password_hash = db.Column(db.String(128), nullable = False)
    _created = db.Column(db.DateTime(), default = datetime.utcnow, nullable = False)

    def __repr__(self) -> str:
        return f'< User {self.id} {self.username} {self.email}'