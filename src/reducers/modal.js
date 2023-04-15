import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    currentModal: null,
  },
  reducers: {
    updateModal: (state, action) => {
      state.currentModal = action.payload.currentModal;
    },
    clearModal: (state) => {
      state.currentModal = null;
    },
  },
});

export const { updateModal, clearModal } = modalSlice.actions;

export default modalSlice.reducer;
