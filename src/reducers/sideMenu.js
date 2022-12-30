import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "sideMenu",
  initialState: {
    collapsed: true,
  },
  reducers: {
    showMenu: (state) => {
      state.collapsed = false;
    },
    hideMenu: (state) => {
      state.collapsed = true;
    },
  },
});

export const { showMenu, hideMenu } = toastSlice.actions;

export default toastSlice.reducer;
