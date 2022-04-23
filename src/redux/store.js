import logger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./root-reducer";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart']
}

const middlewares = [logger, thunk]

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store)