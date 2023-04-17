import { createSlice } from "@reduxjs/toolkit";

export const builderSlice = createSlice({
  name: "projects",
  initialState: {
    project: {},
    components: {},
    projectLoading: true,
    componentsLoading: true,
  },
  reducers: {
    updateProject: (state, action) => {
      state.project = action.payload.project;
      state.projectLoading = false;
    },
    updateComponents: (state, action) => {
      state.components = action.payload.components;
      state.componentsLoading = false;
    },
    clearProject: (state) => {
      state.project = {};
      state.projectLoading = true;
    },
  },
});

export const { updateProject, updateComponents, clearProject } =
  builderSlice.actions;

export default builderSlice.reducer;
