import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import companySlice from "./reducers/companySlice";
import userSlice from "./reducers/userSlice";
import branchSlice from "./reducers/branchSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    company: companySlice,
    user: userSlice,
    branch:branchSlice,
  },
});
