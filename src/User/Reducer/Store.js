import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Reducer/authSlice'
import cartReducer from '../Reducer/CartReducer'

const store = configureStore({
  reducer: {
   auth:authReducer,
   cart:cartReducer
  },
});

export default store;
