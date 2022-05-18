import { createSelector } from "reselect";

const selectFavorites = state => state.favorites

export const selectFavoriteItems = createSelector(
  [selectFavorites],
  favorites => favorites.items
)

export const selectFavoritesIsLoading = createSelector(
  [selectFavorites],
  favorites => favorites.isLoading
)

export const selectFavoritesError = createSelector(
  [selectFavorites],
  favorites => favorites.error
)

export const selectItemInFavorites = style_id => createSelector(
  [selectFavorites],
  favorites => {
    return favorites.items.filter(item => item.style_id === style_id).length > 0
  }
)