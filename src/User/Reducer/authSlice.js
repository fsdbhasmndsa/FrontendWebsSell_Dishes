import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Token: localStorage.getItem("Token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.Token = action.payload;
      localStorage.setItem("Token", action.payload);
    },
    logout: (state) => {
      state.Token = null;
      localStorage.removeItem("Token");
    },
  },
});


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
