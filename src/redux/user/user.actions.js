import axios from "axios";
import { getCartStartAsync } from "../cart/cart.actions";

import userActionTypes from "./user.types";

const setUser = user => ({
  type: userActionTypes.SET_USER,
  payload: user
})

export const clearUser = () => ({
  type: userActionTypes.CLEAR_USER
})

const userRefreshStart = () => ({
  type: userActionTypes.USER_REFRESH_START
})

const userSignInStart = () => ({
  type: userActionTypes.USER_SIGN_IN_START
})

const userValidateStart = () => ({
  type: userActionTypes.USER_VALIDATE_START
})

const setAccessToken = access_token => ({
  type: userActionTypes.SET_ACCESS_TOKEN,
  payload: access_token
})

const userValidateSuccess = () => ({
  type: userActionTypes.USER_VALIDATE_SUCCESS
})

const userRefreshError = error => ({
  type: userActionTypes.USER_REFRESH_ERROR,
  payload: error
})

const userSignInError = error => ({
  type: userActionTypes.USER_SIGN_IN_ERROR,
  payload: error
})

export const clearError = () => ({
  type: userActionTypes.CLEAR_ERROR
})

export const userSignUpStart = () => ({
  type: userActionTypes.USER_SIGN_UP_START
})

export const userSignUpError = () => ({
  type: userActionTypes.USER_SIGN_UP_ERROR,
})

export const userSignUpEnd = () => ({
  type: userActionTypes.USER_SIGN_UP_END
})

export const userSignInStartAsync = ({ username, password }) => {
  return async dispatch => {
    dispatch(userSignInStart())
    try {
      const response = await axios({
        method: 'post',
        url: '/api/token',
        auth: {
          username: username,
          password: password
        }
      })
      const user = response.data['user']
      dispatch(setUser(user));
      dispatch(getCartStartAsync(user['access_token'], user['refresh_token'], '/api/cartitems'))
    } catch (error) {
      dispatch(userSignInError(error));
    }
  }
}

export const userRefreshStartAsync = (refresh_token, callback, callbackParameters) => {
  return async dispatch => {
    dispatch(userRefreshStart())
    try {
      const response = await axios({
        method: 'post',
        url: '/api/token/refresh',
        headers: { Authorization: `Bearer ${refresh_token}` }
      })
      const accessToken = response.data['user']['access_token']
      dispatch(setAccessToken(accessToken))
      dispatch(callback(accessToken, ...callbackParameters))
    } catch (error) {
      dispatch(userRefreshError(error));
    }
  }
}

export const validateUserToken = (token, refreshToken, url) => {
  return async dispatch => {
    dispatch(userValidateStart())
    try {
      await axios({
        method: 'get',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(userValidateSuccess())
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refreshToken))
        }
      };
    }
  }
}