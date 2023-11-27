import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateUser, DataUSer } from "../types";

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
      state.lettera = action.payload.displayName ? action.payload.displayName.split("")[0] : action.payload.email?.split("")[0];
    },
    deleteUserRedux: (state) => {
      state.displayName = "";
      state.email = "";
      state.phoneNumber = "";
      state.lettera = "";
    },
    updateUserRedux: (state, action: PayloadAction<{ displayName: string }>) => {
      state.displayName = action.payload.displayName;
    },
  },
});

export default authSlice.reducer;
export const { getDataUser, deleteUserRedux, updateUserRedux } = authSlice.actions;
