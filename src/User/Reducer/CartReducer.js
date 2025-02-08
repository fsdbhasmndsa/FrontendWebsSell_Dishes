import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import axios from 'axios';
import { data } from 'react-router-dom';

export const fetchCartFromServer = createAsyncThunk("cart/fetchCartFromServer", async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/Cart/viewCart`, {

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.Listcart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return localStorage.getItem("ListCart") == ""
      ? []
      : JSON.parse(localStorage.getItem("ListCart"))
  }
});

// Thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, token }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Cart/AddtoCart`,
        { productId, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
);

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, token }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/Cart/deleteToCart`, {
        data: productId,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return productId;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  }
);

// Tăng số lượng sản phẩm trong giỏ hàng
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ productId, token }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/Cart/increaseCart`,
        {productId},
        {
          
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.idP;
    } catch (error) {
      console.error("Error increasing quantity:", error);
      throw error;
    }
  });

// Giảm số lượng sản phẩm trong giỏ hàng
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ productId, token }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/Cart/decreaseCart`,
        {productId},
        {
           
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.idP;
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      throw error;
    }
  }
);

const initialState = {
  Cart: localStorage.getItem("ListCart") == "" || !localStorage.getItem("ListCart")
    ? []
    : JSON.parse(localStorage.getItem("ListCart")),
  loading: false,
  error: null
};

const CartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddItemAction: (state, action) => {
      let itemadd = { ...action.payload, quantity: 1 };
      let index = state.Cart.findIndex(item => item._id === itemadd._id);
      if (index !== -1) {
        state.Cart[index].quantity += 1;
      } else {
        state.Cart.push(itemadd);
      }
      toast.success("Add successful");
      localStorage.setItem("ListCart", JSON.stringify(state.Cart));
    },
    AddMoreItemAction: (state, action) => {
      console.log("action",)
      const { item, quantity } =action.payload
      let itemadd = { ...action.payload.item, quantity: quantity };
      let index = state.Cart.findIndex(item => item._id === itemadd._id);
      if (index !== -1) {
        state.Cart[index].quantity += quantity;
      } else {
        state.Cart.push(itemadd);
      }
      toast.success("Add successful");
      localStorage.setItem("ListCart", JSON.stringify(state.Cart));
    },
    deleteItemAction: (state, action) => {
      if (window.confirm("Do you want to delete this?")) {
        let index = state.Cart.findIndex(sp => sp._id === action.payload._id);
        state.Cart.splice(index, 1);
        localStorage.setItem("ListCart", JSON.stringify(state.Cart));
      }
    },
    increaseAmoutAction: (state, action) => {
      let newItem = state.Cart.find(sp => sp._id === action.payload._id);
      newItem.quantity += 1;
      localStorage.setItem("ListCart", JSON.stringify(state.Cart));
    },
    decreaseAmoutAction: (state, action) => {
      let newItem = state.Cart.find(sp => sp._id === action.payload._id);
      newItem.quantity -= 1;
      if (newItem.quantity < 1) {
        if (window.confirm("Do you want to delete this product?")) {
          let index = state.Cart.findIndex(sp => sp._id === action.payload._id);
          state.Cart.splice(index, 1);
        } else {
          newItem.quantity += 1;
        }
      }
      localStorage.setItem("ListCart", JSON.stringify(state.Cart));
    },
    clearItemAction: (state) => {
      if (window.confirm("Do you want to clear this basket?")) {
        state.Cart = [];
      }
      localStorage.setItem("ListCart", JSON.stringify(state.Cart));
    },
    AutoClear: (state) => {
      state.Cart = [];
    }

  }
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromServer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.Cart = action.payload;
        state.loading = false;
        // localStorage.setItem("ListCart", JSON.stringify(state.Cart));
      })
      .addCase(fetchCartFromServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingProduct = state.Cart.find(item => item._id === action.payload._id);
        if (existingProduct) {
          existingProduct.quantity += action.payload.quantity;
        } else {
          state.Cart.push(action.payload);
        }
        toast.success("Add successful")
      })

      // Xóa sản phẩm khỏi giỏ hàng
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.Cart = state.Cart.filter(item => item._id !== action.payload._id);
        toast.success("Delete successful")
      })

      // Tăng số lượng sản phẩm
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        console.log("action.payload.idP",action.payload)
        const product = state.Cart.find(item => item._id == action.payload);
        if (product) {
          product.quantity += 1;
        }
      })

      // Giảm số lượng sản phẩm
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        console.log("action.payload.idP",action.payload)
        const product = state.Cart.find(item => item._id == action.payload);
        if (product && product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.Cart = state.Cart.filter(item => item._id !== action.payload._id); // Xóa nếu số lượng về 0
        }
      });
  }
});

export const { AddItemAction, decreaseAmoutAction, deleteItemAction, increaseAmoutAction, clearItemAction, AutoClear,AddMoreItemAction } = CartReducer.actions;
export default CartReducer.reducer;
