import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { modalActions, projectsActions } from "../../../actions";

import Block from "../Block";

const CreateProjectModal = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector((state) => state.session);

  const [fetching, setFetching] = useState(false);

  const hideModal = () => {
    dispatch(modalActions.hideModal());
  };

  const createProject = async (validData) => {
    const payload = { ...validData, uid: currentSession.uid };

    setFetching(true);

    await dispatch(projectsActions.addNewProject(payload));

    setFetching(false);
    hideModal();
  };

  return <Block title="Create a new website"></Block>;
};

export default CreateProjectModal;
