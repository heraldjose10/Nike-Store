import os
import sqlalchemy
import pandas as pd

DB_URI = 'sqlite:///' + \
    os.path.join(os.path.abspath(os.path.dirname(__file__)), 'nike.db')

dbEngine = sqlalchemy.create_engine(DB_URI)

if __name__ == '__main__':

    dataframes = []

    product_categories = pd.read_csv('./data/product_categories.csv')
    products = pd.read_csv('./data/products.csv')
    product_styles = pd.read_csv('./data/product_styles.csv')
    product_images = pd.read_csv('./data/product_images.csv')

    product_categories.to_sql(
        con=dbEngine, name='product_categories', if_exists='append', index=False)
    products.to_sql(
        con=dbEngine, name='products', if_exists='append', index=False)
    product_styles.to_sql(
        con=dbEngine, name='product_styles', if_exists='append', index=False)
    product_images.to_sql(
        con=dbEngine, name='product_images', if_exists='append', index=False)
