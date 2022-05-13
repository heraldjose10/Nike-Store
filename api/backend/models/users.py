from sqlalchemy.orm import backref
from datetime import datetime
from backend import db, bcrypt


class Users(db.Model):
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
        return f'< User {self.id} {self.username} {self.email} >'


class CartItems(db.Model):
    """model for storing relation between users and style items"""
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True
    )
    product_style_id = db.Column(
        db.Integer,
        db.ForeignKey('product_styles.id'),
        primary_key=True
    )
    item_count = db.Column(db.Integer)

    users = db.relationship('Users', backref=backref(
        'product_styles', lazy='dynamic'))
    product_styles = db.relationship(
        'ProductStyles', backref=backref('users', lazy='dynamic'))

    def get_item_details(self):
        return {
            'count': self.item_count,
            'id': self.product_styles.product_id,
            'style_id': self.product_style_id,
            'name': self.product_styles.product.name,
            'price': float(self.product_styles.product.price),
            'colour': self.product_styles.colour,
            'images': [self.product_styles.images[0].image_url] if self.product_styles.images and len(self.product_styles.images) > 0 else [],
            'short_description': self.product_styles.product.short_description
        }

    def __repr__(self) -> str:
        return f'< CartItem {self.user_id} {self.product_style_id} count: {self.item_count} >'


class UserReviews(db.Model):
    """database model for user reviews"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'products.id'), nullable=False)
    title = db.Column(db.String(256))
    body = db.Column(db.Text)
    rating = db.Column(db.Integer, nullable=False)

    def __repr__(self) -> str:
        return f'< UserReview {self.id} {self.rating} {self.title} >'
