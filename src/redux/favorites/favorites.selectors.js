import { createSelector } from "reselect";

const selectFavorites = state => state.favorites

export const selectFavoriteItems = createSelector(
  [selectFavorites],
  favorites => favorites.items
)