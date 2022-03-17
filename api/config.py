import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config():
    """Configurations for Flask application"""
    SECRET_KEY = os.environ.get('SECRET_KEY')
    DEBUG = False


class DevelopmentConfig(Config):
    """Development configurations for Flask application"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'nike.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    """Testing configurations for Flask application"""
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'nike-test.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False,
    SECRET_KEY = 'testing secret'


class ProductionConfig(Config):
    """Production configurations for Flask application"""
    DEBUG = False


configs = {
    'development': DevelopmentConfig,
    'test': TestingConfig,
    'production': ProductionConfig
}