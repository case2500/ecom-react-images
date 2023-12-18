import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../URL.js";
import axios from "axios";

const initialState = {
  users: [],
};

// ***************** getuserlist user All
export const getuserlist = createAsyncThunk(
  "user/getAll",
  async (authtoken, thunkAPI) => {
    // alert(authtoken)
    try {
      const response = await axios.get(`${URL}users`, {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getuserlist.fulfilled, (state, action) => {
      // console.log("action.payload" + action.payload);
      state.users = action.payload;
    });
  },
});

export const selectIsLoading = (state) => state.product.isLoading;
export const selectUser = (state) => state.user.users;
export default userSlice.reducer;
