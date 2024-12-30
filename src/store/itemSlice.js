import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Stores items added to the cart
};

const itemSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Find the existing item in the cart by matching on $id (or the identifier you're using)
      const existingItem = state.cartItems.find(
        (item) => item.$id === action.payload.$id // Match by $id, as it's consistent in the action payload
      );

      if (existingItem) {
        // If item exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // Remove item from the cart by matching its $id
      state.cartItems = state.cartItems.filter(
        (item) => item.$id !== action.payload
      );
    },
    clearCart: (state) => {
      // Clear all items from the cart
      state.cartItems = [];
    },
    updateQuantity: (state, action) => {
      const { itemId, change } = action.payload;
      const item = state.cartItems.find((item) => item.$id === itemId);

      if (item) {
        // Update the quantity, ensuring it doesn't go below 1
        item.quantity = Math.max(1, item.quantity + change);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  itemSlice.actions;

export default itemSlice.reducer;
