import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { modalActions } from "../../../actions";

import Block from "../../base/Block";
import LoadingContainer from "../../containers/LoadingContainer";
import DummyProjects from "./molecules/DummyProjects";

import styles from "./index.module.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const { isLoading, projectsList } = useSelector((state) => state.projects);

  const showAddProjectModal = async () => {
    dispatch(
      modalActions.showModal({
        type: "createProject",
      })
    );
  };

  return (
    <div className={styles.container}>
      <LoadingContainer isLoading={isLoading}>
        <Block
          title="My projects"
          button="Add new project"
          onClick={showAddProjectModal}
          stickyHeader
        >
          <div className={styles.content}>
            {!!projectsList.length ? (
              <div className={styles.projects}>
                {projectsList.map((project) => {
                  const { id } = project;

                  return <button key={id} className={styles.project} />;
                })}
              </div>
            ) : (
              <DummyProjects />
            )}
          </div>
        </Block>
      </LoadingContainer>
    </div>
  );
};

export default Projects;
