import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coinSlice from "../feature/coin/coinSlice";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";

const persistConfig = {
  timeout: 500,
  key: "root",
  storage: localStorage,
};

const reducers = combineReducers({
  coin: coinSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
