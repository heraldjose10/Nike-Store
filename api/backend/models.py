from datetime import datetime
from backend import db, bcrypt


class User(db.Model):
    """database model for user"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, nullable=False)
    email = db.Column(db.String(128), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    _created = db.Column(
        db.DateTime(), default=datetime.utcnow, nullable=False)

    def set_password(self, password):
        """sets password of User object

        parameters
        ----------
        password : str
        """
        self.password_hash = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        """verifies password of User object

        parameters
        ----------
        password : str
        """
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self) -> str:
        return f'< User {self.id} {self.username} {self.email}'
