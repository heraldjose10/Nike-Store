import { createSelector } from "reselect"

const selectCart = state => state.cart

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.items
)

export const selectTotalCartItems = createSelector(
  [selectCart],
  cart => cart.items.length
)

export const selectCartTotal = createSelector(
  [selectCart],
  cart => cart.items.reduce((prev, curr) => prev + (curr.count * curr.price), 0)
)