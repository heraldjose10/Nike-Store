import { useDispatch, useSelector } from "react-redux"
import { Fragment, useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import {
  selectCartError,
  selectCartIsLoading,
  selectCartItems,
  selectCartTotal,
  selectTotalCartItems
} from "../../redux/cart/cart.selectors"
import { selectAccessToken, selectRefreshToken, selectUserId } from "../../redux/user/user.selectors"
import { getCartStartAsync, emptyCart } from "../../redux/cart/cart.actions"

import CartItem from "../../components/cart-item/cart-item.component"
import CustomButton from "../../components/custom-button/custom-button.component"
import Loader from "../../components/loader.component.jsx/loader.component"

const Cart = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const totalCartItems = useSelector(selectTotalCartItems)
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const accessToken = useSelector(selectAccessToken)
  const refreshToken = useSelector(selectRefreshToken)
  const cartIsLoading = useSelector(selectCartIsLoading)
  const cartError = useSelector(selectCartError)
  const userId = useSelector(selectUserId)

  useLayoutEffect(() => {
    dispatch(emptyCart())
    dispatch(getCartStartAsync(accessToken, refreshToken, '/api/cartitems'))
  }, [refreshToken, accessToken, dispatch])


  const checkout = async () => {
    const response = await axios({
      method: 'post',
      url: '/checkout',
      data: {
        amount: cartTotal + 200,
        cust_id: userId
      }
    })
    if (response.data.message === 'success') {
      navigate('/checkout', {
        state: {
          txnToken: response.data.txnToken,
          orderId: response.data.order_id
        }
      })
    }
    else {
      console.log('nop');
    }
  }

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
          cartIsLoading
            ? <Loader />
            : (
              cartItems.map((item, index) => (
                <Fragment key={index}>
                  <CartItem
                    item={{ ...item }}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                  />
                  <div className="w-[90%] border-t border-[#e5e5e5] h-[1px]"></div>
                </Fragment>
              ))
            )
        }

        {
          (!cartTotal && !cartIsLoading && !cartError) && (
            <p className="w-full px-4 text-center lg:text-left">
              There are no items in your bag.
            </p>
          )
        }
        {
          (cartError) && (
            <p className="w-full px-4 text-center lg:text-left">
              There was an error loading cart
            </p>
          )
        }
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
        <CustomButton
          buttonText='Checkout'
          padding_y={5}
          buttonAction={checkout}
        />
      </div>
    </div>
  )
}

export default Cart