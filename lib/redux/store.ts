import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import socketSlice from "./reducers/socketSlice";
import userSlice from "./reducers/userSlice";

const reducer = combineReducers({
  user: userSlice,
  socket: socketSlice,
});

export function makeStore() {
  return configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
    ],
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
