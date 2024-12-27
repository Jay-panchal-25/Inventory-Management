import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Stores the user data
    isLoggedIn: false, // Tracks login state
  },
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;

      // Example validation: Replace with your backend/API logic
      if (email === "admin@example.com" && password === "password123") {
        state.user = { email };
        state.isLoggedIn = true;
      } else {
        state.user = null;
        state.isLoggedIn = false;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
