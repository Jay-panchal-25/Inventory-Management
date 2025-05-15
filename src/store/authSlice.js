import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      const { user } = action.payload;

      // Check email to assign role
      if (user.email === "admin@gmail.com") {
        user.role = "admin";
      } else {
        user.role = "user";
      }

      state.user = user;
      state.isLoggedIn = true;
      state.role = user.role;

      console.log(`${user.role} login successful`);
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
