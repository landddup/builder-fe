import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { projectsActions } from "../../../actions";

import Block from "../../base/Block";
import LoadingContainer from "../../containers/LoadingContainer";
import DummyProjects from "./molecules/DummyProjects";

import styles from "./index.module.scss";

const Projects = () => {
  const dispatch = useDispatch();

  const {
    projects: { isLoading, projectsList },
    session: { currentSession },
  } = useSelector((state) => state);

  const [fetching, setFetching] = useState(false);

  const handleAddProject = async () => {
    setFetching(true);

    await dispatch(projectsActions.addNewProject(currentSession.uid));

    setFetching(false);
  };

  return (
    <div className={styles.container}>
      <LoadingContainer isLoading={isLoading}>
        <Block
          title="My projects"
          button="Add new project"
          isLoading={fetching}
          onClick={handleAddProject}
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
