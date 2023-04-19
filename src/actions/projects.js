import dayjs from "dayjs";

import actions from ".";
import firebase from "../firebase-config";
import constants from "../utils/constants";

import {
  updateProjects,
  updateTemplates,
  clearProjects,
  clearTemplates,
} from "../reducers/projects";

function sortByDate(items) {
  const output = items.sort((a, b) =>
    dayjs(a.createdAt).isAfter(b.createdAt) ? -1 : 1
  );

  return output;
}

export function setProjects(projectsList) {
  return async (dispatch) => {
    await dispatch(updateProjects({ projectsList: sortByDate(projectsList) }));
  };
}

export function setTemplates(templates) {
  return async (dispatch) => {
    await dispatch(updateTemplates({ templates: sortByDate(templates) }));
  };
}

export function setProjectsToInitial() {
  return async (dispatch) => {
    await dispatch(clearProjects());
  };
}

export function setTemplatesToInitial() {
  return async (dispatch) => {
    await dispatch(clearTemplates());
  };
}

export function initTemplates() {
  return async (dispatch) => {
    const templates = [];
    const collectionSnap = await firebase.functions.db.getDocs(
      firebase.functions.db.collection(
        firebase.db,
        constants.firebase.COLLECTION_TYPES.TEMPLATES
      )
    );

    collectionSnap.forEach((el) => templates.push(el.data()));

    dispatch(setTemplates(templates));
  };
}

export function addNewProject({ uid, title }) {
  return async (dispatch) => {
    try {
      const contentBlockRef = firebase.functions.db.doc(
        firebase.db,
        constants.firebase.COLLECTION_TYPES.ELEMENTS,
        constants.builder.ELEMENT_TYPES.CONTENT_BLOCK
      );

      const collectionRef = firebase.functions.db.collection(
        firebase.db,
        `${constants.firebase.COLLECTION_TYPES.PROJECTS}/${uid}/items`
      );

      const contentBlockSnap = await firebase.functions.db.getDoc(
        contentBlockRef
      );

      const newProject = {
        title,
        createdAt: dayjs().unix(),
        elements: {
          0: contentBlockSnap.data(),
        },
      };

      await firebase.functions.db.addDoc(collectionRef, newProject);

      await dispatch(
        actions.toast.show({
          type: constants.toast.TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Project successfully added",
        })
      );
    } catch (error) {
      console.log("addNewProject error: ", error);

      await dispatch(
        actions.toast.show({
          type: constants.toast.TOAST_TYPES.ERROR,
          duration: 3000,
          message: "Project not added",
        })
      );
    }
  };
}

export function deleteProject(uid, dbId) {
  return async (dispatch) => {
    try {
      const collectionRef = firebase.functions.db.collection(
        firebase.db,
        `${constants.firebase.COLLECTION_TYPES.PROJECTS}/${uid}/items`
      );

      await firebase.functions.db.deleteDoc(
        firebase.functions.db.doc(collectionRef, dbId)
      );

      await dispatch(
        actions.toast.show({
          type: constants.toast.TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Project successfully deleted",
        })
      );
    } catch (error) {
      console.log("deleteProject error: ", error);

      await dispatch(
        actions.toast.show({
          type: constants.toast.TOAST_TYPES.ERROR,
          duration: 3000,
          message: "Project not deleted",
        })
      );
    }
  };
}
