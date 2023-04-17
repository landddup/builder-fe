import React from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../../actions";

import { Block } from "../../";
import { Template } from "./molecules";

import styles from "./index.module.scss";

const CreateProjectModal = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector((state) => state.session);
  const { templates } = useSelector((state) => state.projects);

  const hideModal = () => {
    dispatch(actions.modal.hideModal());
  };

  const createProject = async (project) => {
    const payload = { ...project, uid: currentSession.uid };

    await dispatch(actions.projects.addNewProject(payload));
    hideModal();
  };

  return (
    <Block title="Create a new website">
      <div className={styles.templates}>
        {templates.map((template) => {
          const { createdAt, title } = template;

          return (
            <Template key={createdAt} title={title} onAdd={createProject} />
          );
        })}
      </div>
    </Block>
  );
};

export default CreateProjectModal;
