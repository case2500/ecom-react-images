import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../URL.js"

const initialState = {
  isLoggedIn: false,
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    role:""
  },
  users:[],
};

//http://localhost:5000/api/
export const updateUser = createAsyncThunk(
  "auth/updateuser",
  async ({authtoken, formData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${URL}updateuser`,formData,
      {  headers: {
        authtoken,
        }}
      );

      // localStorage.setItem("user", JSON.stringify(response.data));
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

// Get a user id
export const getUserId = createAsyncThunk(
  "auth/getUserId",
  async (id, thunkAPI) => {
    try {
    //  alert(id);
      const response = await axios.get(`${URL}user` + id);
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



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      state.name = action.payload;
    },
    SET_USERLIST(state, action) {
      state.users = action.payload;
      
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.id = profile._id;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.bio = profile.bio;
      state.user.phone = profile.phone;
      state.user.role = profile.role;
      // alert(JSON.stringify(state.user));
    },
    logout: (state, action) => {
        state.user =   {
        name: "",
        email: "",
        phone: "",
        bio: "",
        role :""
      };
    },
  },

});


export const { SET_LOGIN, SET_NAME, SET_USER ,logout,SET_USERLIST} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
