import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../URL.js";
const API_URL = `${URL}product/`;

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  message: "",  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
  productsearch: [],
};

// Create New Product
export const createProduct = createAsyncThunk(
  "products/create",
  async ({ authtoken, formData  }, thunkAPI) => {
    try {
      // alert(authtoken)
      const response = await axios.post(API_URL,formData , {
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
export const getProducts = createAsyncThunk(
  "products/getAll",
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

// Get category products
export const getProductSearch = createAsyncThunk(
  "products/search ",
  async (keyword, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}products/productsearch/${keyword}`
      );
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

// Get category products
export const getProductsCategory = createAsyncThunk(
  "products/getsingle",
  async (kindcategory, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}category/${kindcategory}`);
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
export const deleteProduct = createAsyncThunk(
  "products/delete",
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

// Get a product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      // alert(id)
      const response = await axios.get(API_URL + id);
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
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ authtoken, id, values }, thunkAPI) => {
    try {
      const response = await axios.patch(`${API_URL}${id}`, values, {
        headers: {
          authtoken,
        },
      });
      alert(JSON.stringify(values))
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getProducts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
      })

      .addCase(getProductsCategory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        return {
          ...state,
          categoryproducts: [...action.payload],
        };
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);

        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //getProductSearch
      .addCase(getProductSearch.fulfilled, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        state.productsearch = action.payload;
      })
      .addCase(getProductSearch.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      });
  },
});

export const selectProduct = (state) => state.product.product;
export const selectProductsearch = (state) => state.product.productsearch;
export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;
