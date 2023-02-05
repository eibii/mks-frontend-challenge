import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productSlice from "@/slices/productSlice";
import bagSlice from "@/slices/bagSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    bag: bagSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

export default store;
