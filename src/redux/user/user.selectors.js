import { createSelector } from "reselect";

const selectUser = state => state.user

export const selectAccessToken = createSelector(
  [selectUser],
  user => user.access_token
)