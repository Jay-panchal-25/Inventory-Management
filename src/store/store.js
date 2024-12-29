import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import itemReducer from "./itemSlice";

const store = new configureStore({
  reducer: {
    auth: authSlice,
    cart: itemReducer,
  },
});

export default store;
