import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { StateUser, DataUSer } from "./types";

const initialState: StateUser = {
  displayName: "",
  email: "",
  phoneNumber: "",
  lettera: "",
  status: "idle",
  error: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getDataUser: (state, action: PayloadAction<DataUSer>) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      //  первая буква имени, для аватара
      state.lettera = action.payload.displayName?.split('')[0];
    }
  },
});

export default authSlice.reducer;
export const { getDataUser } = authSlice.actions;
