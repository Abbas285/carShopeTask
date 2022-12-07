import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const initialState = {
  token: false,
  curentUser: {},
};
//simple Auth Slice due to with Jwt token other wize use  redux thunk for auth

const getApiSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    tokenState: (state, action) => {
      state.token = action.payload.token;
      state.curentUser = action.payload.curentUser;
    },
    cleartoken: (state) => {
      state.token = "";
      state.curentUser = "";
      storage.removeItem("persist:root");
    },
  },
});
export const { tokenState, cleartoken } = getApiSlice.actions;
export default getApiSlice.reducer;
