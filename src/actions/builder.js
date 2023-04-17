import firebase from "../firebase-config";
import constants from "../utils/constants";
import {
  clearProject,
  updateProject,
  updateComponents,
} from "../reducers/builder";

export function setProject(project) {
  return async (dispatch) => {
    await dispatch(updateProject({ project }));
  };
}

export function setProjectToInitial() {
  return async (dispatch) => {
    await dispatch(clearProject());
  };
}

export function initComponents() {
  return async (dispatch) => {
    const components = {};
    const collectionSnap = await firebase.functions.db.getDocs(
      firebase.functions.db.collection(
        firebase.db,
        constants.firebase.COLLECTION_TYPES.COMPONENTS
      )
    );

    collectionSnap.forEach((el) => (components[el.id] = el.data()));

    dispatch(updateComponents({ components }));
  };
}
