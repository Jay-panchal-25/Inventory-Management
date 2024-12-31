import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const itemSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.$id === action.payload.$id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.$id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    updateQuantity: (state, action) => {
      const { itemId, change } = action.payload;
      const item = state.cartItems.find((item) => item.$id === itemId);

      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  itemSlice.actions;

export default itemSlice.reducer;
