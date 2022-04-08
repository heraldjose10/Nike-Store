import shopActionTypes from "./shop.types";

const INITIAL_STATE = {
  products: {
    total: 0,
    items: [],
    nextURL: null
  },
  currentProduct: null,
  currentStyle: null,
  categories: [],
  currentCategory: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: {
          ...action.payload,
          items: [...state.products.items, ...action.payload.items]
        }
      }
    case shopActionTypes.CLEAR_PRODUCTS:
      return {
        ...state,
        products: {
          total: 0,
          items: [],
          nextURL: null
        }
      }
    case shopActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload]
      }
    case shopActionTypes.SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload
      }
    case shopActionTypes.CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: null
      }
    case shopActionTypes.SET_CURRENT_STYLE:
      return {
        ...state,
        currentStyle: action.payload
      }
    case shopActionTypes.CLEAR_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: null
      }
    case shopActionTypes.ClEAR_CURRENT_STYLE:
      return {
        ...state,
        currentStyle: null
      }
    case shopActionTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      }
    default:
      return state
  }
}

export default shopReducer