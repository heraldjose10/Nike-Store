import os
import unittest
import sqlalchemy

from populate import populate
from backend import db, create_app


class ApiBaseTestCase(unittest.TestCase):
    """base TestCase"""

    def setUp(self) -> None:
        """function to set up app context and test db"""
        self.app = create_app('test')
        self.test_client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()  # push app to app_context
        db.create_all()

        dbEngine = sqlalchemy.create_engine(
            self.app.config['SQLALCHEMY_DATABASE_URI'])
        populate(dbEngine)

    def tearDown(self) -> None:
        """function to remove app context and delete test db"""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
