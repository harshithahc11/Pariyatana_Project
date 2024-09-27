import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseUrl";
const getToken = () => localStorage.getItem("paryatan");
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
export const getAllCompanyData = createAsyncThunk(
  "company/getAllCompanyData",
  async () => {
    try {
      const response = await baseURL.get(`/company`, getAuthHeaders());
      // console.log("response.data===>", response.data.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const getAllUserList = createAsyncThunk(
  "user/getAllUserList",
  async (id) => {
    try {
      const response = await baseURL.get(`/userlist/${id}`, getAuthHeaders());
      console.log("response.data===>", response.data.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const createCompanyData = createAsyncThunk(
  "company/createCompanyData",
  async (data) => {
    try {
      const response = await baseURL.post(`/company`, data, getAuthHeaders());
      // console.log("response.data===>", response.data.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const getSingleCompanyData = createAsyncThunk(
  "company/getSingleCompanyData",
  async (id) => {
    try {
      const response = await baseURL.get(`/company/${id}`, getAuthHeaders());
      // console.log("response.data===>", response.data.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const updateCompanyData = createAsyncThunk(
  "company/updateCompanyData",
  async (data) => {
    try {
      const response = await baseURL.patch(`/company/`,data, getAuthHeaders());
      // console.log("response.data===>", response.data.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const companySlice = createSlice({
  name: "company",
  initialState: {
    companyData: [],
    userList: [],
    singleCompany: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCompanyData.fulfilled, (state, action) => {
        state.loading = false;
        state.companyData = action.payload;
      })
      .addCase(getAllCompanyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(getAllUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(getAllUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(getSingleCompanyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleCompanyData.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCompany = action.payload;
      })
      .addCase(getSingleCompanyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const getCompanyData = (state) => state.company.companyData;
export const getUserList = (state) => state.company.userList;
export const getUniqueCompanyData = (state) => state.company.singleCompany;
export const companyError = (state) => state.company.loading;
export default companySlice.reducer;
