import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../utilities/api";
export const uploadFile = createAsyncThunk(
  "user/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${baseUrl}user/userImage`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return response data to the fulfilled action
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const res = await axios.get(`${baseUrl}user`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
   
    return res.data
  } catch (err) {
    console.log(err);
  }

});
const initialState = {
  token: localStorage.getItem("token") || null,
  name: "",
  address: "",
  phone: "",
  role: "",
  email: "",
  gender: "",
  cart: [],
  wishList: [],
  image: {},
  code:""
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reciveToken(state, action) {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      
    },

    signout(state, action) {
      localStorage.removeItem("token");
      state.token = null;
    },

    setImage(state, action) {
      state.image = action.payload;
    },

    addCode(state,action){
      state.code = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {})
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploading = false;
        state.success = true;

       
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.uploading = false;
        state.success = true;
        state.wishList = action.payload.data.wishList
        state.name = action.payload.data.name;
      state.cart = action.payload.data.cart;
      state.phone = action.payload.data.phone;
      state.email = action.payload.data.name;
      state.address = action.payload.data.address;
      state.wishList = action.payload.data.wishList;
      state.role = action.payload.data.role;
      state.gender = action.payload.data.gender;
      state.image = action.payload.data.image
       
      })
      .addCase(uploadFile.rejected, (state, action) => {});

     
  },
});

export const { reciveToken, signout, setImage ,addCode} = userSlice.actions;
export default userSlice.reducer;
