import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../URL.js"
const API_URL = `${URL}silder/`;

const initialState = {
  silder: [],
  isError: false,
  isSuccess: false,


};

// Create New Product
export const createSilder = createAsyncThunk(
  "silder/create",
  async ({ authtoken, formData }, thunkAPI) => {
    try {
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



export const selectIsLoading = (state) => state.silder.isLoading;
export const selectProduct = (state) => state.silder;

export default silderSlice.reducer;
