import { useSelector } from "react-redux"

import { selectCartItems, selectTotalCartItems } from "../../redux/cart/cart.selectors"

import CartItem from "../../components/cart-item/cart-item.component"
import { Fragment } from "react"

const Cart = () => {

  const totalCartItems = useSelector(selectTotalCartItems)
  const cartItems = useSelector(selectCartItems)

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="my-10 flex flex-col items-center">
        <h1 className="text-2xl font-semibold">Bag</h1>
        <span className="flex gap-4" >
          <p className="text-gray-500">{`${totalCartItems} items |`}</p>
          <p>₹ 54600</p>
        </span>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] border-t border-gray-500 h-[1px]"></div>
        {
          cartItems.map(item => (
            <Fragment>
              <CartItem {...item} />
              <div className="w-[90%] border-t border-gray-500 h-[1px]"></div>
            </Fragment>

          ))
        }
      </div>
    </div>
  )
}

export default Cart