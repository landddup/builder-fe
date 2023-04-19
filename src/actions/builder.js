import firebase from "../firebase-config";
import constants from "../utils/constants";
import {
  clearProject,
  updateProject,
  updateElements,
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

export function initElements() {
  return async (dispatch) => {
    const elements = {};
    const collectionSnap = await firebase.functions.db.getDocs(
      firebase.functions.db.collection(
        firebase.db,
        constants.firebase.COLLECTION_TYPES.ELEMENTS
      )
    );

    collectionSnap.forEach((el) => (elements[el.id] = el.data()));

    dispatch(updateElements({ elements }));
  };
}
