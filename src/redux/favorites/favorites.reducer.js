import favoritesActionTypes from "./favorites.types";
import { deleteFromFavorites } from "./favorites.utils";

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null
}

const favoritesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case favoritesActionTypes.GET_FAVORITES_START:
    case favoritesActionTypes.SET_FAVORITE_START:
    case favoritesActionTypes.DELETE_FAVORITE_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case favoritesActionTypes.GET_FAVORITES_ERROR:
    case favoritesActionTypes.SET_FAVORITE_ERROR:
    case favoritesActionTypes.DELETE_FAVORITE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case favoritesActionTypes.SET_FAVORITES:
      return {
        items: action.payload,
        isLoading: false,
        error: null
      }
    case favoritesActionTypes.SET_FAVORITE_ITEM:
      return {
        items: [...state.items, action.payload],
        isLoading: false,
        error: null
      }
    case favoritesActionTypes.DELETE_FAVORITE:
      return {
        items: deleteFromFavorites(state.items, action.payload),
        isLoading: false,
        error: null
      }
    default:
      return state;
  }
}

export default favoritesReducer