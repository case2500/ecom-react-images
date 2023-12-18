import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {URL} from "../../URL.js"
import axios from "axios";
import Company from './../../pages/admin/company/Company';
const API_URL = `${URL}company/`;

const authtoken = JSON.parse(localStorage.getItem("token"))

const initialState = {
  company: null,
  // companies: [],
  singlecompany: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// ***************** createCompany
export const createCompany = createAsyncThunk(
  "Company/createCompany",
  async (formData, thunkAPI) => {

    try {
      const response = await axios.post(`${API_URL}`, formData,{
        haders:{
          authtoken
        }
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

// ***************** Update updateCompany
export const updateCompany = createAsyncThunk(
  "Company/updateCompany",
  async ({ id, formData }, thunkAPI) => {
    // alert(id)
    try {
      const response = await axios.patch(`${API_URL}${id}`, formData,{
        headers:{
          authtoken
        }
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

// ***************** getCategories
export const getCompany = createAsyncThunk(
  "Company/getAll",
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

// ***************** getCategories id
export const getSingleCompany = createAsyncThunk(
  "Company/single",
  async (id, thunkAPI) => {   
    try{
    const response = await axios.get(`${API_URL}single/`+id,{      
      headers:{
        authtoken
      }
  });
  // alert(JSON.stringify(response.data))
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

// *****************  del product
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async ( id, thunkAPI) => {

    try {
      const response = await axios.delete(`${API_URL}`+id,{
        
          headers:{
            authtoken
          }
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

const CompanySlice = createSlice({
  name: "company",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCompany.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.isSuccess = true;
        // state.isError = false;
        console.log(action.payload);
        state.company = action.payload;
        state.companies = action.payload;
        //  alert(JSON.stringify(state.companies))
      })
      .addCase(getSingleCompany.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.isSuccess = true;
        // state.isError = false;
        console.log(action.payload);
        state.company = action.payload;
        // state.companies = action.payload;
        //  alert(JSON.stringify(state.companies))
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })


  },
});

export const selectIsLoading = (state) => state.company.isLoading;


export const selectCompany = (state) => state.company.company;
export const selectCompanies = (state) => state.company.companies ;
export default CompanySlice.reducer;
