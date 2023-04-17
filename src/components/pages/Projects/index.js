import React from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../actions";

import { LoadingContainer } from "../../containers";
import { Block } from "../../base";
import { DummyProjects, ProjectTile } from "./molecules";

import styles from "./index.module.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector((state) => state.session);
  const { projectsLoading, projectsList } = useSelector(
    (state) => state.projects
  );

  const showAddProjectModal = async () => {
    dispatch(
      actions.modal.showModal({
        type: "createProject",
      })
    );
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the project?"
    );

    if (confirmDelete) {
      await dispatch(actions.projects.deleteProject(currentSession.uid, id));
    }
  };

  return (
    <div>
      <LoadingContainer isLoading={projectsLoading}>
        <Block
          title="My projects"
          button="Create new project"
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
