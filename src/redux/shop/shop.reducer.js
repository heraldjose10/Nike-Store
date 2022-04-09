import shopActionTypes from "./shop.types";

const INITIAL_STATE = {
  products: {
    total: 0,
    items: [],
    nextURL: null,
    isFetching: false,
    error: null
  },
  currentProduct: {
    isFetching: false,
    item: null,
    error: null
  },
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
          items: [...state.products.items, ...action.payload.items],
          isFetching: false,
          error: null
        }
      }
    case shopActionTypes.CLEAR_PRODUCTS:
      return {
        ...state,
        products: {
          total: 0,
          items: [],
          nextURL: null,
          isFetching: false,
          error: null
        }
      }
    case shopActionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        products: {
          ...state.products,
          isFetching: true
        }
      }
    case shopActionTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        products: {
          ...state.products,
          error: action.payload
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
        currentProduct: {
          item: action.payload,
          isFetching: false,
          error: null
        }
      }
    case shopActionTypes.CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: INITIAL_STATE.currentProduct
      }
    case shopActionTypes.FETCH_CURRENT_PRODUCT_START:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          isFetching: true
        }
      }
    case shopActionTypes.FETCH_CURRENT_PRODUCT_ERROR:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          error: action.payload
        }
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