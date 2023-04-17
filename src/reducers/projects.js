import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projectsList: [],
    templates: [],
    project: {},
    projectsLoading: true,
    templatesLoading: true,
    projectLoading: true,
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
    updateProject: (state, action) => {
      state.project = action.payload.project;
      state.projectLoading = false;
    },
    clearProjects: (state) => {
      state.projectsList = [];
      state.projectsLoading = true;
    },
    clearTemplates: (state) => {
      state.templates = [];
      state.templatesLoading = true;
    },
    clearProject: (state) => {
      state.project = {};
      state.projectLoading = true;
    },
  },
});

export const {
  updateProjects,
  updateTemplates,
  updateProject,
  clearProjects,
  clearTemplates,
  clearProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
