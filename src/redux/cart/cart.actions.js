import axios from "axios"
import { userRefreshStartAsync } from "../user/user.actions"
import cartActionTypes from "./cart.types"

export const setCartItem = (item) => ({
  type: cartActionTypes.SET_CART_ITEM,
  payload: item
})

const setCartItemStart = () => ({
  type: cartActionTypes.SET_CART_ITEM_START
})

const setCartItemError = (error) => ({
  type: cartActionTypes.SET_CART_ITEM_ERROR,
  payload: error
})

export const deleteFromCart = (item) => ({
  type: cartActionTypes.DELETE_FROM_CART,
  payload: item
})

const deleteFromCartStart = () => ({
  type: cartActionTypes.DELETE_FROM_CART_START
})

const deleteFromCartError = (error) => ({
  type: cartActionTypes.DELETE_FROM_CART_ERROR,
  payload: error
})

const getCartStart = () => ({
  type: cartActionTypes.GET_CART_START
})

const getCartError = error => ({
  type: cartActionTypes.GET_CART_ERROR,
  payload: error
})

const setCart = items => ({
  type: cartActionTypes.SET_CART,
  payload: items
})

export const emptyCart = () => ({
  type: cartActionTypes.EMPTY_CART
})

const updateCartItem = (item) => ({
  type: cartActionTypes.UPDATE_CART,
  payload: item
})

const updateCartItemStart = () => ({
  type: cartActionTypes.UPDATE_CART_START
})

const updateCartItemError = () => ({
  type: cartActionTypes.UPDATE_CART_ERROR
})

export const setCartItemStartAsync = (token, url, item, count, refresh_token) => {
  return async (dispatch) => {
    dispatch(setCartItemStart())
    try {
      await axios({
        method: 'post',
        url: url,
        data: { style_id: item['style_id'], item_count: count },
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(setCartItem(item))
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token, setCartItemStartAsync, [url, item, count, refresh_token]))
        }
        else {
          dispatch(setCartItemError(error))
        }
      };
    }
  }
}

export const deleteFromCartAsync = (token, url, item, refresh_token) => {
  return async dispatch => {
    dispatch(deleteFromCartStart())
    try {
      await axios({
        method: 'delete',
        url: url,
        data: { style_id: item['style_id'] },
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(deleteFromCart(item))
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token, deleteFromCartAsync, [url, item, refresh_token]))
        }
        else {
          dispatch(deleteFromCartError(error))
        }
      };
    }
  }
}

export const getCartStartAsync = (token, refresh_token, url) => {
  return async dispatch => {
    dispatch(getCartStart())
    try {
      const response = await axios({
        method: 'get',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(setCart(response.data['items']))
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token, getCartStartAsync, [refresh_token, url]))
        }
        else {
          dispatch(getCartError(error))
        }
      };
    }
  }
}

export const updateCartItemAsync = (token, refresh_token, item, count, url) => {
  return async dispatch => {
    dispatch(updateCartItemStart())
    try {
      await axios({
        method: 'patch',
        url: url,
        data: { style_id: item.style_id, item_count: count },
        headers: { Authorization: `Bearer ${token}` }
      })
      updateCartItem(item)
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token, updateCartItemAsync, [refresh_token, item, count, url]))
        }
        else {
          dispatch(updateCartItemError(error))
        }
      };
    }
  }
}