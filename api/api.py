from backend import db, create_app
from backend.models.users import CartItems, Users
from backend.models.products import Products, ProductCategories, ProductImages, ProductStyles

app = create_app()


@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'Users': Users,
        'Products': Products,
        'ProductImages': ProductImages,
        'ProductCategories': ProductCategories,
        'ProductStyles': ProductStyles,
        'CartItems': CartItems
    }


if __name__ == '__main__':
    app.run()
