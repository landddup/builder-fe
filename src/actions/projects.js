import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { toastActions } from ".";
import { db, dbFunctions } from "../firebase-config";
import { updateProjects } from "../reducers/projects";
import { COLLECTION_TYPES } from "../utils/constants/firebase";
import { TOAST_TYPES } from "../utils/constants/toast";

function sortByDate(items) {
  const output = items.sort((a, b) =>
    dayjs(a.createdAt).isAfter(b.createdAt) ? -1 : 1
  );

  return output;
}

export function subscribeOnProjects(uid) {
  return (dispatch) => {
    const unsubscribe = dbFunctions.onSnapshot(
      dbFunctions.collection(db, `${COLLECTION_TYPES.PROJECTS}/${uid}/items`),
      async (doc) => {
        let projectsList = [];

        doc.forEach((el) => projectsList.push(el.data()));

        await dispatch(
          updateProjects({ projectsList: sortByDate(projectsList) })
        );
      }
    );

    return unsubscribe;
  };
}

export function addNewProject({ uid, ...rest }) {
  return async (dispatch) => {
    try {
      const newProject = { id: nanoid(), createdAt: dayjs().unix(), ...rest };
      const collectionRef = dbFunctions.collection(
        db,
        `${COLLECTION_TYPES.PROJECTS}/${uid}/items`
      );

      await dbFunctions.addDoc(collectionRef, newProject);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Project successfully added",
        })
      );
    } catch (error) {
      console.log("addNewProject error: ", error);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: "Project not added",
        })
      );
    }
  };
}
