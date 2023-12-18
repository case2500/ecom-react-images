import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../URL";
const API_URL = `${URL}silder/`;

const initialState = {
  silder: [],
  isError: false,
  isSuccess: false,
  isLoading: false,

};

// Create New Product
export const createSilder = createAsyncThunk(
  "silder/create",
  async ({ authtoken, formData }, thunkAPI) => {
    try {
      //  alert(JSON.stringify(formData))
      const response = await axios.post(API_URL, formData, {
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getSilders = createAsyncThunk(
  "silder/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);





// Delete a Product
export const deleteSilder = createAsyncThunk(
  "silder/delete",
  async ({ authtoken, id }, thunkAPI) => {
    // alert("authtoken"+authtoken)
    try {
      const response = await axios.delete(API_URL + id, {
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Update product
export const updateSilder = createAsyncThunk(
  "silder/updateSilder",
  async ({ authtoken, id, formData }, thunkAPI) => {
    try {
      const response = await axios.patch(`${API_URL}${id}`, formData, {
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const silderSlice = createSlice({
  name: "silder",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        return array.push(productValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { quantity } = item;

        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSilders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSilders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.silder = action.payload;
      })
  },
});

export const {
  CALC_STORE_VALUE,
  CALC_OUTOFSTOCK,
  CALC_CATEGORY,
  FILTER_PRODUCTS,
  GET_PRICE_RANGE,
} = silderSlice.actions;

export const selectIsLoading = (state) => state.silder.isLoading;
export const selectProduct = (state) => state.silder;

export default silderSlice.reducer;
