import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import actions from "../../../actions";
import firebase from "../../../firebase-config";
import constants from "../../../utils/constants";

import styles from "./index.module.scss";

const BuilderLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { uid } = useSelector((state) => state.session.currentSession);

  const initProject = () => {
    const collectionRef = firebase.functions.db.collection(
      firebase.db,
      `${constants.firebase.COLLECTION_TYPES.PROJECTS}/${uid}/items`
    );

    const unsubscribe = firebase.functions.db.onSnapshot(
      firebase.functions.db.doc(collectionRef, projectId),
      async (doc) => await dispatch(actions.builder.setProject(doc.data())),
      async (error) => {
        console.log("subscribeOnProject error: ", error);
      }
    );

    dispatch(actions.builder.initComponents());

    return unsubscribe;
  };

  const resetToInitial = () => {
    dispatch(actions.builder.setProjectToInitial());
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
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default BuilderLayout;
