import unittest

from tests.test_database import DataBaseTestCase
from tests.test_user_resource import UserResourceTestCase
from tests.test_tokens import TokenTestCase
from tests.test_product_resource import ProductResourceTestCase
from tests.test_category_resource import CategoryResourceTestCase
from tests.test_cart_items_resource import CartItemsTestCase
from tests.test_favorites_resource import FavoritesTestCase


database_test = unittest.TestLoader().loadTestsFromTestCase(DataBaseTestCase)
user_resource_test = unittest.TestLoader().loadTestsFromTestCase(UserResourceTestCase)
token_test = unittest.TestLoader().loadTestsFromTestCase(TokenTestCase)
product_resource_test = unittest.TestLoader().loadTestsFromTestCase(ProductResourceTestCase)
category_resource_test = unittest.TestLoader().loadTestsFromTestCase(CategoryResourceTestCase)
cart_items_resource_test = unittest.TestLoader().loadTestsFromTestCase(CartItemsTestCase)
favorites_resource_test = unittest.TestLoader().loadTestsFromTestCase(FavoritesTestCase)

main = unittest.TestSuite([
    category_resource_test, 
    database_test, 
    user_resource_test, 
    token_test, 
    product_resource_test,
    cart_items_resource_test,
    favorites_resource_test
])

if __name__ == '__main__':
    # initialize a runner and pass the main suite
    runner = unittest.TextTestRunner(verbosity=3)
    result = runner.run(main)
