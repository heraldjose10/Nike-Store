import shopActionTypes from "./shop.types";

export const setProducts = (products) => ({
  type: shopActionTypes.SET_PRODUCTS,
  payload: products
})

export const setCategories = (categories) => ({
  type: shopActionTypes.SET_CATEGORIES,
  payload: categories
})

export const setTotalProducts = totalProducts => ({
  type: shopActionTypes.SET_TOTAL_PRODUCTS,
  payload: totalProducts
})

export const setCurrentProduct = currentProduct => ({
  type: shopActionTypes.SET_CURRENT_PRODUCT,
  payload: currentProduct
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