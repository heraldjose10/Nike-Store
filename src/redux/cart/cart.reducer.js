import cartActionTypes from "./cart.types";
import { addToCart, deleteFromCart } from "./cart.utils";

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.SET_CART_ITEM_START:
      return {
        ...state,
        isLoading: true
      }
    case cartActionTypes.DELETE_FROM_CART_START:
      return {
        ...state,
        isLoading: true
      }
    case cartActionTypes.GET_CART_START:
    case cartActionTypes.UPDATE_CART_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case cartActionTypes.SET_CART_ITEM_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case cartActionTypes.DELETE_FROM_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case cartActionTypes.GET_CART_ERROR:
    case cartActionTypes.UPDATE_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case cartActionTypes.SET_CART_ITEM:
    case cartActionTypes.UPDATE_CART:
      return {
        ...state,
        items: addToCart(state.items, action.payload),
        isLoading: false
      }
    case cartActionTypes.DELETE_FROM_CART:
      return {
        ...state,
        items: deleteFromCart(state.items, action.payload),
        isLoading: false
      }
    case cartActionTypes.SET_CART:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      }
    case cartActionTypes.EMPTY_CART:
      return {
        ...state,
        items: []
      }
    default:
      return state
  }
}

export default cartReducer