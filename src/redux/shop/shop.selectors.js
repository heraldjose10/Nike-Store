import { createSelector } from "reselect";

const selectShop = state => state.shop

export const selectProducts = createSelector(
  [selectShop],
  shop => shop.products
)

export const selectProductItems = createSelector(
  [selectProducts],
  products => products.items
)

export const selectCurrentProduct = createSelector(
  [selectShop],
  shop => shop.currentProduct
)

export const selectTotalProducts = createSelector(
  [selectProducts],
  products => products.total
)

export const selectNextURL = createSelector(
  [selectProducts],
  products => products.nextURL
)

export const selectCategories = createSelector(
  [selectShop],
  shop => shop.categories
)


export const selectCurrentCategory = createSelector(
  [selectShop],
  shop => shop.currentCategory
)

export const selectCurrentStyle = createSelector(
  [selectShop],
  shop => shop.currentStyle
)