import cartActionTypes from "./cart.types";
import { addToCart, deleteFromCart, removeFromCart } from "./cart.utils";

const INITIAL_STATE = {
  items: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.SET_CART_ITEM:
      return {
        items: addToCart(state.items, action.payload)
      }
    case cartActionTypes.REMOVE_CART_ITEM:
      return {
        items: removeFromCart(state.items, action.payload)
      }
    case cartActionTypes.DELETE_FROM_CART:
      return {
        items: deleteFromCart(state.items, action.payload)
      }
    default:
      return state
  }
}

export default cartReducer