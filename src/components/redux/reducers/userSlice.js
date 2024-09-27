import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseUrl";
const getToken = () => localStorage.getItem("paryatan");
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
export const getAllUserData = createAsyncThunk(
  "user/getAllUserData",
  async () => {
    try {
      const response = await baseURL.get(`/user`, getAuthHeaders());
      // console.log("response.data===>", response.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const getSingleUserData = createAsyncThunk(
  "user/getSingleUserData",
  async (id) => {
    try {
      const response = await baseURL.get(`/user/${id}`, getAuthHeaders());
      // console.log("response.data===>", response.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const getAllCompanyList = createAsyncThunk(
  "company/getAllCompanyList",
  async () => {
    try {
      const response = await baseURL.get(
        "/company/companylist",
        getAuthHeaders()
      );
      // console.log("response.data====>", response.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const getAllBranchList = createAsyncThunk(
  "branch/getAllBranchList",
  async (cid) => {
    try {
      const response = await baseURL.get(
        `/branch/branchlist/${cid}`,
        getAuthHeaders()
      );
      console.log("response.data====>", response.data);
      return response.data.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const updateUserData = createAsyncThunk(
  "branch/getAllBranchList",
  async (data) => {
    try {
      const response = await baseURL.patch(`/user`, data, getAuthHeaders());
      console.log("response.data====>", response.data);
      return response.data;
    } catch (error) {
      alert(`${error.response.data.message}`);
      throw error;
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    singleuserData: {},
    companyList: [],
    branchList: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getAllUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(getSingleUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.singleuserData = action.payload;
      })
      .addCase(getSingleUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(getAllCompanyList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCompanyList.fulfilled, (state, action) => {
        state.loading = false;
        state.companyList = action.payload;
      })
      .addCase(getAllCompanyList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(getAllBranchList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBranchList.fulfilled, (state, action) => {
        state.loading = false;
        state.branchList = action.payload;
      })
      .addCase(getAllBranchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const getUserData = (state) => state.user.userData;
export const getUniqueUserData = (state) => state.user.singleuserData;
export const getCompanyList = (state) => state.user.companyList;
export const getBranchList = (state) => state.user.branchList;
export const userError = (state) => state.user.loading;
export default userSlice.reducer;
