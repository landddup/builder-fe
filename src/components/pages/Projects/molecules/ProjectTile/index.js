import React, { useState } from "react";
import PropTypes from "prop-types";

import { CustomLink, Button } from "../../../../shared";

import styles from "./index.module.scss";

const ProjectTile = ({ id, title, onDelete }) => {
  const [fetching, setFetching] = useState(false);

  const handleDelete = async () => {
    setFetching(true);

    await onDelete(id);

    setFetching(false);
  };

  return (
    <div className={styles.project}>
      <p className={styles.projectTitle}>{title}</p>

      <div className={styles.preview}>
        <div className={styles.buttons}>
          <CustomLink to={`projects/${id}`} className={styles.link}>
            <Button
              className={styles.editButton}
              label="Edit"
              size="small"
              disabled={fetching}
            />
          </CustomLink>

          <Button
            className={styles.deleteButton}
            label="Delete"
            variant="outlined"
            size="small"
            onClick={handleDelete}
            isLoading={fetching}
          />
        </div>
      </div>
    </div>
  );
};

ProjectTile.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

ProjectTile.defaultProps = {
  title: "",
};

export default ProjectTile;
