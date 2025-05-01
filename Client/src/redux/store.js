import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/CartSlice";
import authReducer from "./features/auth/authSlice"
import authApi from "./features/auth/authApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
