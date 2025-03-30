import { createSlice } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      const user = authService.getCurrentUser();

      const { email, password } = action.payload;

      // Hardcoded admin details
      const admin = {
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      };

      if (user && email === "admin@gmail.com" && password === "password123") {
        // Admin login logic
        state.user = { email: admin.email, role: "admin" };
        state.isLoggedIn = true;
        state.role = "admin";

        console.log("Admin login successful");
      } else {
        // Regular user login logic

        if (user) {
          state.user = { name: user.name, email: user.email, role: "user" };
          state.isLoggedIn = true;
          state.role = "user";
          console.log("User login successful");
        } else {
          // Invalid credentials
          state.user = null;
          state.isLoggedIn = false;
          state.role = null;
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
