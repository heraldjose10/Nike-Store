export const deleteFromFavorites = (favorites, item) => {
  const updatedFavorites = favorites.filter(fav => fav.style_id !== item.style_id)
  return updatedFavorites
}