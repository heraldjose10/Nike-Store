import unittest

from tests.test_database import DataBaseTestCase
from tests.test_user_resource import UserResourceTestCase
from tests.test_tokens import TokenTestCase


database_test = unittest.TestLoader().loadTestsFromTestCase(DataBaseTestCase)
user_resource_test = unittest.TestLoader().loadTestsFromTestCase(UserResourceTestCase)
token_test = unittest.TestLoader().loadTestsFromTestCase(TokenTestCase)

main = unittest.TestSuite([database_test, user_resource_test, token_test])

if __name__ == '__main__':
    # initialize a runner and pass the main suite
    runner = unittest.TextTestRunner(verbosity=3)
    result = runner.run(main)
