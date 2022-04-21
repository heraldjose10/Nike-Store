import cartActionTypes from "./cart.types"

export const setCartItem = (item) => ({
  type: cartActionTypes.SET_CART_ITEM,
  payload: item
})

export const removeCartItem = (item) => ({
  type: cartActionTypes.REMOVE_CART_ITEM,
  payload: item
})

export const deleteFromCart = (item) => ({
  type: cartActionTypes.DELETE_FROM_CART,
  payload: item
})