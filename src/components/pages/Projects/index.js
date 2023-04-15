import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { modalActions } from "../../../actions";

import LoadingContainer from "../../containers/LoadingContainer";
import Block from "../../base/Block";
import DummyProjects from "./molecules/DummyProjects";
import Button from "../../base/Button";

import styles from "./index.module.scss";
import CustomLink from "../../base/Link";

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
                  const { id, title } = project;

                  return (
                    <div key={id} className={styles.project}>
                      <CustomLink to={`projects/${id}`} className={styles.link}>
                        <div className={styles.preview}>
                          <Button
                            className={styles.editButton}
                            label="Edit"
                            variant="outlined"
                            size="large"
                          />
                        </div>
                      </CustomLink>

                      <p className={styles.projectTitle}>{title}</p>
                    </div>
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
