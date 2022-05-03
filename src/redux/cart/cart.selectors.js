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

export const selectItem = item => createSelector(
  [selectCart],
  cart => cart.items.filter(i => i.id === item.id && i.name === item.name)
)