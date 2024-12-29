import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Stores items added to the cart
};

const itemSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // Update the quantity if the item exists
        existingItem.quantity += 1;
      } else {
        // Add a new item to the cart
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = itemSlice.actions;

export default itemSlice.reducer;
