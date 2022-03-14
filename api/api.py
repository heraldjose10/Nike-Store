from flask import Flask

app = Flask(__name__)

@app.route('/shop')
def shop():
  return {
    'products' : [
      {'id' : 1, 'name' : 'Air Force 1', 'price' : '8999'},
      {'id' : 2, 'name' : 'Nike Strada', 'price' : '1999'},
      {'id' : 3, 'name' : 'Air Jordan \'86', 'price' : '13999'}
    ]
  }