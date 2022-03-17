from tests import ApiBaseTestCase
from backend import db
from backend.models import User


class DataBaseTestCase(ApiBaseTestCase):
    """testcases to test database"""

    def test_register_user(self):
        """create two user and test adding to db"""
        user1 = User(username='userone', email='userone@mail.com')
        user1.set_password('userone_password')
        user2 = User(username='usertwo', email='usertwo@mail.com')
        user2.set_password('usertwo_password')

        db.session.add(user1)
        db.session.add(user2)

        self.assertEqual(user1.username, 'userone')
        self.assertNotEqual(user2.username, 'user_two')

        self.assertNotEqual(user1.email, 'user1@mail.com')
        self.assertEqual(user2.email, 'usertwo@mail.com')

    def test_password(self):
        """test password hashing methods"""
        user1 = User(username='UserOne', email='user1@mail.com')
        user1.set_password('user1')

        self.assertNotEqual(user1.password_hash, 'user1')
        self.assertFalse(user1.check_password('1234'))
        self.assertTrue(user1.check_password('user1'))
