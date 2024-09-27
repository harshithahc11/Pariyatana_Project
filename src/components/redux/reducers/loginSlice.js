import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseUrl";

export const loginAPI = createAsyncThunk(
  "login/authlogin",
  async (userDetails) => {
    try {
      const response = await baseURL.post("/auth/signin", userDetails);
      return response.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const signInAPI = createAsyncThunk(
  "sign/signInAPI",
  async (userDetails) => {
    try {
      const response = await baseURL.post("auth/signup", userDetails);
      return response.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
});
export const loader = (state) => state.login.loading;
export default loginSlice.reducer;
