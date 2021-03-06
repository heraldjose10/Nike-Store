def make_products_array(products, base_url):

    base_url_stripped = base_url.split('/')[:4]
    base_url = ('/'.join(base_url_stripped))
    
    products_array = []

    for product in products.items:
        # get styles of product
        styles = product.product_styles
        # get images of first style
        images = styles[0].images if len(styles) > 0 else None

        products_array.append({
            'id': product.id,
            'name': product.name,
            'price': float(product.price),
            'short_description': product.short_description,
            'pic': images[0].image_url if images and len(images) > 0 else None,
            'category': product.product_category.name,
            'links': {
                'self': f'{base_url}/products/{product.id}'
            }
        })

    return products_array
