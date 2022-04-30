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

export const removeCartItem = (item) => ({
  type: cartActionTypes.REMOVE_CART_ITEM,
  payload: item
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

export const setCartItemStartAsync = (token, url, item, refresh_token) => {
  return async (dispatch) => {
    dispatch(setCartItemStart())
    try {
      const response = await axios({
        method: 'post',
        url: url,
        data: { style_id: item['id'], item_count: 1 },
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(setCartItem(item))
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token))
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
      const response = await axios({
        method: 'delete',
        url: url,
        data: { style_id: item['id'], item_count: 1 },
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(deleteFromCart(item))
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token))
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
          dispatch(userRefreshStartAsync(refresh_token))
        }
        else {
          dispatch(getCartError())
        }
      };
    }
  }
}