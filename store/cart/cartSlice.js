import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../URL.js"
import Swal from 'sweetalert2'

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if(cart){
      return JSON.parse(localStorage.getItem('cart'))
  } else {
      return [];
  }
}

const storeInLocalStorage = (data) => {
  // localStorage.setItem('cart', JSON.stringify(data))
}


export const savecart = createAsyncThunk(
  "cart/savecart",
  async (formData, thunkAPI) => {
    try {
      return await axios.post(URL, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const itemInCart = state.cart.find((item) => item.id === action.payload._id );
      if (itemInCart) {
        itemInCart.quantity=(newItem.quantity+itemInCart.quantity);
        state.data = itemInCart;
        Swal.fire(
          'เพิ่มสินค้าเรียบร้อย'
        )
        storeInLocalStorage(...state.cart,state.data);
      } else {
        state.cart.push({
          id: newItem._id,
          price: newItem.price,
          quantity:action.payload.quantity,
          totalPrice: newItem.price,
          name: newItem.name,
          cover: newItem.images[0],
        });
        Swal.fire(
          'เพิ่มสินค้าเรียบร้อย'
        )
        storeInLocalStorage(state.cart);
      }
      
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.quantity++;
      storeInLocalStorage(state.cart);
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity === 1) {
        item.quantity = 1;
        storeInLocalStorage(state.cart);
      } else {
        item.quantity--;
        storeInLocalStorage(state.cart);
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
      storeInLocalStorage(state.cart);
    },
    CLEAR_CART: (state, action) => {
      state.cart = [];
      storeInLocalStorage(state.cart);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  CLEAR_CART,
} = cartSlice.actions;

export default cartSlice.reducer;
