from flask_restful import Resource

from backend.models.products import ProductCategories


class CategoriesList(Resource):
    """methods for list of categories"""

    def get(self):
        """return list of categories"""
        categories = ProductCategories.query.order_by(ProductCategories.id)

        return {
            'items': [{'id': category.id, 'name': category.name} for category in categories],
            'total': ProductCategories.query.count()
        }, 200
