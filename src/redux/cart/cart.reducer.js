import cartActionTypes from "./cart.types";
import { addToCart, deleteFromCart, removeFromCart } from "./cart.utils";

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.SET_CART_ITEM_START, cartActionTypes.SET_CART_ITEM_START:
      return {
        ...state,
        isLoading: true
      }
    case cartActionTypes.SET_CART_ITEM_ERROR, cartActionTypes.DELETE_FROM_CART_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case cartActionTypes.SET_CART_ITEM:
      return {
        ...state,
        items: addToCart(state.items, action.payload)
      }
    case cartActionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        items: removeFromCart(state.items, action.payload)
      }
    case cartActionTypes.DELETE_FROM_CART:
      return {
        ...state,
        items: deleteFromCart(state.items, action.payload)
      }
    default:
      return state
  }
}

export default cartReducer