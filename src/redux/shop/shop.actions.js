import axios from "axios";

import shopActionTypes from "./shop.types";

export const setProducts = (products) => ({
  type: shopActionTypes.SET_PRODUCTS,
  payload: products
})

export const fetchProductsStart = () => ({
  type: shopActionTypes.FETCH_PRODUCTS_START
})

const fetchProductsError = (error) => ({
  type: shopActionTypes.FETCH_PRODUCTS_ERROR,
  payload: error
})

export const setCategories = (categories) => ({
  type: shopActionTypes.SET_CATEGORIES,
  payload: categories
})

export const setCurrentProduct = currentProduct => ({
  type: shopActionTypes.SET_CURRENT_PRODUCT,
  payload: currentProduct
})

export const fetchCurrentProductStart = () => ({
  type: shopActionTypes.FETCH_CURRENT_PRODUCT_START
})

const fetchCurrentProductError = (error) => ({
  type: shopActionTypes.FETCH_CURRENT_PRODUCT_ERROR,
  payload: error
})

export const setCurrentCategory = currentCategory => ({
  type: shopActionTypes.SET_CURRENT_CATEGORY,
  payload: currentCategory
})

export const setCurrentStyle = currentStyle => ({
  type: shopActionTypes.SET_CURRENT_STYLE,
  payload: currentStyle
})

export const clearProducts = () => ({
  type: shopActionTypes.CLEAR_PRODUCTS
})

export const clearCurrentProduct = () => ({
  type: shopActionTypes.CLEAR_CURRENT_PRODUCT
})

export const clearCurrentStyle = () => ({
  type: shopActionTypes.ClEAR_CURRENT_STYLE
})

export const clearCurrentCategory = () => ({
  type: shopActionTypes.CLEAR_CURRENT_CATEGORY
})

export const fetchProductsStartAsync = (url, limit, offset) => {
  return async dispatch => {
    dispatch(fetchProductsStart())
    try {
      const response = await axios({
        method: 'get',
        url: url,
        params: {
          limit: limit,
          offset: offset
        }
      })
      const data = response.data
      dispatch(setProducts({
        items: data['items'],
        total: data['total'],
        nextURL: data['links']['next']
      }))
    } catch (error) {
      dispatch(fetchProductsError(error));
    }
  }
}

export const fetchCurrentProductStartAsync = (url) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'get',
        url: url
      })
      const data = response.data
      dispatch(setCurrentProduct(data['item']))
    } catch (error) {
      dispatch(fetchCurrentProductError(error))
    }
  }
}