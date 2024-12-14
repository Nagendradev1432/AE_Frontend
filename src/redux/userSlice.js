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

if (localStorage.getItem("token")) {
  const decoded = jwtDecode(localStorage.getItem("token"));
  initialState.name = decoded.user.name;
  initialState.cart = decoded.user.cart;
  initialState.phone = decoded.user.phone;
  initialState.email = decoded.user.email;
  initialState.address = decoded.user.address;
  initialState.wishList = decoded.user.wishList;
  initialState.role = decoded.user.role;
  initialState.gender = decoded.user.gender;

 
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reciveToken(state, action) {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      const decoded = jwtDecode(action.payload);
      state.name = decoded.user.name;
      state.cart = decoded.user.cart;
      state.phone = decoded.user.phone;
      state.email = decoded.user.name;
      state.address = decoded.user.address;
      state.wishList = decoded.user.wishList;
      state.role = decoded.user.role;
      state.gender = decoded.user.gender;
      state.image = decoded.user.image
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
        state.image = action.payload.data.image
       
      })
      .addCase(uploadFile.rejected, (state, action) => {});

     
  },
});

export const { reciveToken, signout, setImage ,addCode} = userSlice.actions;
export default userSlice.reducer;
