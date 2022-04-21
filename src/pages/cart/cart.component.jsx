import { useSelector } from "react-redux"
import { Fragment } from "react"
import { Link } from "react-router-dom"

import {
  selectCartItems,
  selectCartTotal,
  selectTotalCartItems
} from "../../redux/cart/cart.selectors"
import { selectAccessToken } from "../../redux/user/user.selectors"

import CartItem from "../../components/cart-item/cart-item.component"
import CustomButton from "../../components/custom-button/custom-button.component"

const Cart = () => {

  const totalCartItems = useSelector(selectTotalCartItems)
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const accessToken = useSelector(selectAccessToken)

  const FavoritePrompt = (
    <div className="w-full my-10">
      <h2 className="text-2xl self-start">Favorites</h2>
      <p className="flex gap-1">
        <span>Want to view your favorites? </span>
        <Link to='/register'>
          <p
            className="underline hover:cursor-pointer text-gray-500"
          >
            Join us
          </p>
        </Link>
        <span> or </span>
        <Link to='/register'>
          <p
            className="underline hover:cursor-pointer text-gray-500"
          >
            Sign-in
          </p>
        </Link>
      </p>
    </div>
  )

  return (
    <div className="flex flex-col items-center mb-10 lg:flex-row lg:items-start w-full max-w-[1100px] mx-auto">
      <div className="my-10 flex flex-col items-center lg:hidden">
        <h1 className="text-2xl font-semibold">Bag</h1>
        <span className="flex gap-4" >
          <p className="text-gray-500">{`${totalCartItems} items |`}</p>
          <p>{`₹ ${cartTotal}`}</p>
        </span>
      </div>
      <div className="w-full flex flex-col items-center lg:basis-2/3">
        <div className="w-[90%] border-t border-[#e5e5e5] h-[1px] lg:hidden"></div>
        <h1 className="hidden lg:block text-2xl self-start px-4">Bag</h1>
        {
          cartItems.map((item, index) => (
            <Fragment key={index}>
              <CartItem {...item} />
              <div className="w-[90%] border-t border-[#e5e5e5] h-[1px]"></div>
            </Fragment>

          ))
        }
        <div className="hidden lg:block w-full px-4">
          {
            !accessToken && FavoritePrompt
          }
        </div>
      </div>
      <div className="px-4 flex flex-col w-full lg:basis-1/3">
        <h2 className="text-2xl py-5 mt-5">Summary</h2>
        <span className="flex justify-between mb-1">
          <p>Subtotal</p>
          <p className="tracking-wide">{`₹${cartTotal}`}</p>
        </span>
        <span className="flex justify-between mb-1">
          <p>Estimated Shipping & Handling</p>
          <p className="tracking-wide">{`₹${cartTotal && '200'}`}</p>
        </span>
        <span className="flex justify-between my-4">
          <p>Total</p>
          <p className="font-bold tracking-wide">{`₹${cartTotal ? cartTotal + 200 : 0}`}</p>
        </span>
        <CustomButton buttonText='Checkout' padding_y={5} />
        <div className=" lg:hidden">
          {
            !accessToken && FavoritePrompt
          }
        </div>
      </div>
    </div>
  )
}

export default Cart