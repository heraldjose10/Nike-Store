import { useDispatch, useSelector } from "react-redux"
import { Fragment, useLayoutEffect, useState, useEffect } from "react"
import axios from "axios"
import { Helmet } from "react-helmet"

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
  const [checkout, setCheckout] = useState({
    txn: { txnToken: null, orderId: null },
    txnIsLoading: false,
    txnError: null
  })

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


  const handleCheckout = async () => {
    if (!cartTotal || cartError) return

    setCheckout(prevState => {
      return {
        ...prevState,
        txnIsLoading: true,
        txnError: null
      }
    })
    try {
      const response = await axios({
        method: 'post',
        url: 'api/checkout',
        data: {
          amount: cartTotal + 200,
          cust_id: userId
        }
      })
      if (response.data.message === 'success') {
        setCheckout({
          txn: { txnToken: response.data.txnToken, orderId: response.data.order_id },
          txnIsLoading: false,
          txnError: null
        })
      }
      else {
        setCheckout({
          txn: { txnToken: null, orderId: null },
          txnIsLoading: false,
          txnError: 'Server could not process your order. Please try again later.'
        })
      }
    } catch (error) {
      setCheckout({
        txn: { txnToken: null, orderId: null },
        txnIsLoading: false,
        txnError: error
      })
    }
  }

  useEffect(() => {

    if (!checkout.txn.txnToken || !checkout.txn.orderId) return

    const mid = process.env.REACT_APP_PAYTM_MID

    const onScriptLoad = () => {
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: checkout.txn.orderId, /* update order id */
          token: checkout.txn.txnToken, /* update token value */
          tokenType: "TXN_TOKEN",
          amount: "10.00" /* update amount */
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      if (window.Paytm && window.Paytm.CheckoutJS) {
        window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
          // initialze configuration using init method 
          window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
          }).catch(function onError(error) {
            console.log("error => ", error);
          });
        });
      }
    }

    const script = document.createElement('script');
    script.src = `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${mid}.js`;
    script.async = true;
    script.onload = onScriptLoad
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [checkout.txn.txnToken, checkout.txn.orderId])

  return (
    <Fragment>
      <Helmet>
        <title>Nike Cart</title>
      </Helmet>
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
            buttonText={checkout.txnIsLoading ? 'PROCESSING...' : 'Checkout'}
            padding_y={5}
            buttonAction={handleCheckout}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Cart