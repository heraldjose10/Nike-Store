from crypt import methods
from backend import app


@app.route('/shop', methods = ['GET'])
def shop():
    print(app.config['SECRET_KEY'])
    return {
        'products': [
            {'id': 1, 'name': 'Air Force 1', 'price': '8999'},
            {'id': 2, 'name': 'Nike Strada', 'price': '1999'},
            {'id': 3, 'name': 'Air Jordan \'86', 'price': '13999'}
        ]
    }