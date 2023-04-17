import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { projectsActions } from "../../../actions";
import { db, dbFunctions } from "../../../firebase-config";
import { COLLECTION_TYPES } from "../../../utils/constants/firebase";

import { BuilderHeader } from "../../base/Header";

import styles from "./index.module.scss";

const BuilderLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { uid } = useSelector((state) => state.session.currentSession);

  const initProject = () => {
    const collectionRef = dbFunctions.collection(
      db,
      `${COLLECTION_TYPES.PROJECTS}/${uid}/items`
    );

    const unsubscribe = dbFunctions.onSnapshot(
      dbFunctions.doc(collectionRef, projectId),
      async (doc) => await dispatch(projectsActions.setProject(doc.data())),
      async (error) => {
        console.log("subscribeOnProject error: ", error);
      }
    );

    return unsubscribe;
  };

  const resetToInitial = () => {
    dispatch(projectsActions.setProjectToInitial());
  };

  useEffect(() => {
    const unsubscribe = initProject();

    return () => {
      unsubscribe();
      resetToInitial();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.container}>
      <BuilderHeader />

      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default BuilderLayout;
