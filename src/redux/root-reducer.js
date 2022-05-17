import { combineReducers } from "redux";

import cartReducer from "./cart/cart.reducer";
import shopReducer from "./shop/shop.reducer";
import userReducer from "./user/user.reducer";
import favoritesReducer from "./favorites/favorites.reducer";

const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer,
  cart: cartReducer,
  favorites: favoritesReducer
})

export default rootReducer