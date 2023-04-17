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
  const { currentSession } = useSelector((state) => state.session);
  const { projectsLoading, projectsList } = useSelector(
    (state) => state.projects
  );

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
    <div>
      <LoadingContainer isLoading={projectsLoading}>
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
                  const { dbId, title } = project;

                  return (
                    <ProjectTile
                      key={dbId}
                      id={dbId}
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
