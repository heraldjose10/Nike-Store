import axios from "axios";
import { userRefreshStartAsync } from "../user/user.actions";
import favoritesActionTypes from "./favorites.types";

const setFavoriteStart = () => ({
  type: favoritesActionTypes.SET_FAVORITE_START
})

const deleteFavoriteStart = () => ({
  type: favoritesActionTypes.DELETE_FAVORITE_START
})

const getFavoritesStart = () => ({
  type: favoritesActionTypes.GET_FAVORITES_START
})

const setFavoriteError = error => ({
  type: favoritesActionTypes.SET_FAVORITE_ERROR,
  payload: error
})

const deleteFavoriteError = error => ({
  type: favoritesActionTypes.DELETE_FAVORITE_ERROR,
  payload: error
})

const getFavoritesError = error => ({
  type: favoritesActionTypes.GET_FAVORITES_ERROR,
  payload: error
})

const setFavoriteItem = item => ({
  type: favoritesActionTypes.SET_FAVORITE_ITEM,
  payload: item
})

const deleteFavoriteItem = item => ({
  type: favoritesActionTypes.DELETE_FAVORITE,
  payload: item
})

const setFavorites = items => ({
  type: favoritesActionTypes.SET_FAVORITES,
  payload: items
})

export const setFavoriteStartAsync = (token, url, item, refresh_token) => {
  return async dispatch => {
    dispatch(setFavoriteStart())
    try {
      const response = await axios({
        method: 'post',
        url: url,
        data: { style_id: item['style_id'] },
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response);
      dispatch(setFavoriteItem(item))
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token, setFavoriteStartAsync, [url, item, refresh_token]))
        }
      }
      else {
        dispatch(setFavoriteError(error))
      };
    }
  }
}

export const setFavoritesStart = (token, url, refresh_token) => {
  return async dispatch => {
    dispatch(getFavoritesStart())
    try {
      const response = await axios({
        method: 'get',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(setFavorites(response.data.items));
    } catch (error) {
      if (error.response?.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token, setFavoritesStart, [url, refresh_token]))
        }
      }
      else {
        dispatch(getFavoritesError(error))
      };
    }
  }
}

export const deleteFavoriteStartAsync = (token, url, item, refresh_token) => {
  return async dispatch => {
    dispatch(deleteFavoriteStart())
    try {
      axios({
        method: 'delete',
        url: url,
        data: { style_id: item['style_id'] },
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(deleteFavoriteItem(item))
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data['msg'] === 'Token has expired') {
          dispatch(userRefreshStartAsync(refresh_token, deleteFavoriteStartAsync, [url, item, refresh_token]))
        }
      }
      else {
        dispatch(deleteFavoriteError(error))
      };
    }
  }
}