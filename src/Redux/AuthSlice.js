import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
  curentUser: {},
};

const getApiSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    tokenState: (state, action) => {
      state.token = action.payload.token;
      state.curentUser = action.payload.curentUser;
    },
  },
});
export const { tokenState } = getApiSlice.actions;
export default getApiSlice.reducer;
