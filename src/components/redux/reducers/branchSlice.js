import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseUrl";
const getToken = () => localStorage.getItem("paryatan");
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
export const getBranchData = createAsyncThunk(
    "branch/getBranchData",
    async () => {
      try {
        const response = await baseURL.get(`/branch/`, getAuthHeaders());
        // console.log("response.data===>", response.data.data);
        return response.data.data;
      } catch (error) {
        alert(`${error.response.data.message}`);
        throw error;
      }
    }
  );
  export const createBranchData = createAsyncThunk(
    "branch/createBranchData",
    async (data) => {
      try {
        const response = await baseURL.post(`/branch/`,data, getAuthHeaders());
        // console.log("response.data===>", response.data.data);
        return response.data.data;
      } catch (error) {
        alert(`${error.response.data.message}`);
        throw error;
      }
    }
  );
  export const branchSlice = createSlice({
    name: "branch",
    initialState: {
      branchData: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBranchData.pending, (state) => {
          state.loading = true;
        })
        .addCase(getBranchData.fulfilled, (state, action) => {
          state.loading = false;
          state.branchData = action.payload;
        })
        .addCase(getBranchData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        });
    },
});
export const getAllBranchData = (state) => state.branch.branchData;
export const branchError = (state) => state.branch.loading;
export default branchSlice.reducer;