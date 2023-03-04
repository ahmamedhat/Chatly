import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import chatMiddleware from "./socketMiddleware";
import chatSlice from "./reducers/socketSlice";
import storage from "./persistStorage";

const reducer = combineReducers({
  user: userSlice,
  socket: chatSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["socket"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      chatMiddleware,
    ],
  });
}

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
