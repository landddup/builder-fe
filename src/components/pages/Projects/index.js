import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { modalActions, projectsActions } from "../../../actions";

import LoadingContainer from "../../containers/LoadingContainer";
import Block from "../../base/Block";
import DummyProjects from "./molecules/DummyProjects";
import ProjectTile from "./molecules/ProjectTile";

import styles from "./index.module.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const { isLoading, projectsList } = useSelector((state) => state.projects);
  const { currentSession } = useSelector((state) => state.session);

  const showAddProjectModal = async () => {
    dispatch(
      modalActions.showModal({
        type: "createProject",
      })
    );
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the project?"
    );

    if (confirmDelete) {
      await dispatch(projectsActions.deleteProject(currentSession.uid, id));
    }
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
                  const { id, title } = project;

                  return (
                    <ProjectTile
                      key={id}
                      id={id}
                      title={title}
                      onDelete={deleteProject}
                    />
                  );
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
