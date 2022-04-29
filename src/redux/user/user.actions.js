import axios from "axios";

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

const setAccessToken = access_token => ({
  type: userActionTypes.SET_ACCESS_TOKEN,
  payload: access_token
})

const userRefreshError = error => ({
  type: userActionTypes.USER_REFRESH_ERROR,
  payload: error
})

const userSignInError = error => ({
  type: userActionTypes.USER_SIGN_IN_ERROR,
  payload: error
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
      dispatch(setUser(response.data['user']));
    } catch (error) {
      dispatch(userSignInError(error));
    }
  }
}

export const userRefreshStartAsync = (refresh_token) => {
  return async dispatch => {
    dispatch(userRefreshStart())
    try {
      const response = await axios({
        method: 'post',
        url: '/api/token/refresh',
        headers: { Authorization: `Bearer ${refresh_token}` }
      })
      console.log(response.data);
      dispatch(setAccessToken(response.data['user']['access_token']))
    } catch (error) {
      dispatch(userRefreshError(error));
    }
  }
}