from tests import ApiBaseTestCase
from backend import db
from backend.models.users import CartItems, Users
from backend.models.products import ProductImages, ProductStyles, Products, ProductCategories


class DataBaseTestCase(ApiBaseTestCase):
    """testcases to test database"""
    
    def test_register_user(self):
        """create two user and test adding to db"""
        user1 = Users(username='userone', email='userone@mail.com')
        user1.set_password('userone_password')
        user2 = Users(username='usertwo', email='usertwo@mail.com')
        user2.set_password('usertwo_password')

        db.session.add(user1)
        db.session.add(user2)

        self.assertEqual(user1.username, 'userone')
        self.assertNotEqual(user2.username, 'user_two')

        self.assertNotEqual(user1.email, 'user1@mail.com')
        self.assertEqual(user2.email, 'usertwo@mail.com')

    def test_password(self):
        """test password hashing methods"""
        user1 = Users(username='UserOne', email='user1@mail.com')
        user1.set_password('user1')

        self.assertNotEqual(user1.password_hash, 'user1')
        self.assertFalse(user1.check_password('1234'))
        self.assertTrue(user1.check_password('user1'))

    def test_products(self):
        """test total number of products"""
        total_products = Products.query.count()
        self.assertNotEqual(0, total_products)

    def test_product_categories(self):
        """test product categories table"""
        product_categories = ProductCategories.query.all()
        products_category_one = product_categories[0].query.count()

        self.assertEqual(12, len(product_categories))
        self.assertNotEqual(0, products_category_one)
    
    def test_add_to_cart(self):
        """test add to cart functionality"""
        user1 = Users(username='userone', email='userone@mail.com')
        user1.set_password('userone_password')
        user2 = Users(username='usertwo', email='usertwo@mail.com')
        user2.set_password('usertwo_password')

        db.session.add(user1)
        db.session.add(user2)

        style1 = ProductStyles.query.filter_by(id=14).first()
        style2 = ProductStyles.query.filter_by(id=18).first()
        style3 = ProductStyles.query.filter_by(id=19).first()
        
        CartItems(item_count=4, users = user1, product_styles = style1)
        CartItems(item_count=1, users = user1, product_styles = style2)
        CartItems(item_count=6, users = user2, product_styles = style3)

        self.assertEqual(2,user1.product_styles.count())
        self.assertEqual(6, user2.product_styles[0].item_count)

        # update item count
        user1.product_styles.filter_by(product_style_id = 14).first().item_count = 18
        self.assertEqual(18, CartItems.query.filter_by(product_style_id = 14).first().item_count)

        all_cart = CartItems.query.all()
        self.assertEqual(3, len(all_cart))

        # delete a cart item
        user1.product_styles.filter_by(product_style_id = 14).delete()
        all_cart = CartItems.query.all()
        self.assertEqual(2, len(all_cart))

    def test_product_images(self):
        """test product images table"""
        product_image = ProductImages.query.filter_by(id=1).first()
        image_link = product_image.image_url
        product_style = product_image.product_style.style_name

        self.assertEqual(str, type(image_link))
        self.assertEqual(str, type(product_style))