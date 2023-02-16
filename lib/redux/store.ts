import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";

const reducer = combineReducers({
  user: userSlice,
});

export function makeStore() {
  return configureStore({
    reducer: reducer,
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
