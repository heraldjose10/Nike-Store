from backend import db


class ProductCategories(db.Model):
    """database model for product categories"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, nullable=False)

    def __repr__(self) -> str:
        return f'< ProductCategory {self.id} {self.name} >'


class Products(db.Model):
    """database model for products"""
    id = db.Column(db.Integer, primary_key=True)
    product_category_id = db.Column(db.Integer, db.ForeignKey(
        'product_categories.id'), nullable=False)
    name = db.Column(db.String(64), index=True, nullable=False)
    price = db.Column(db.Numeric(8, 2), nullable=False)
    short_description = db.Column(db.Text)
    long_description = db.Column(db.Text)
    product_styles = db.relationship('ProductStyles', back_populates='product')

    def __repr__(self) -> str:
        return f'< Product {self.id} {self.name} {self.price} >'


class ProductStyles(db.Model):
    """database model for product styles"""
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'products.id'), nullable=False)
    colour = db.Column(db.String(256))
    style_name = db.Column(db.String(64), nullable=False)
    product = db.relationship('Products', back_populates='product_styles')
    images = db.relationship('ProductImages', back_populates='product_style')

    def __repr__(self) -> str:
        return f'< ProductStyle {self.id} {self.style_name} >'


class ProductImages(db.Model):
    """database model for product images"""
    id = db.Column(db.Integer, primary_key=True)
    product_style_id = db.Column(db.Integer, db.ForeignKey(
        'product_styles.id'), nullable=False)
    image_url = db.Column(db.String(256), nullable=False)
    product_style = db.relationship('ProductStyles', back_populates='images')

    def __repr__(self) -> str:
        return f'< ProductImage {self.id} {self.image_url} >'
