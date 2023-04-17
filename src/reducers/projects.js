import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projectsList: [],
    templates: [],
    projectsLoading: true,
    templatesLoading: true,
  },
  reducers: {
    updateProjects: (state, action) => {
      state.projectsList = action.payload.projectsList;
      state.projectsLoading = false;
    },
    updateTemplates: (state, action) => {
      state.templates = action.payload.templates;
      state.templatesLoading = false;
    },
    clearProjects: (state) => {
      state.projectsList = [];
      state.projectsLoading = true;
    },
    clearTemplates: (state) => {
      state.templates = [];
      state.templatesLoading = true;
    },
  },
});

export const {
  updateProjects,
  updateTemplates,
  clearProjects,
  clearTemplates,
} = projectsSlice.actions;

export default projectsSlice.reducer;
