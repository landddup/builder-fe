import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import actions from "../../../actions";

import styles from "./index.module.scss";

const DragOverContainer = ({ path, dropAllowed, children }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const containerRef = useRef();

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    const shouldDrop =
      dropAllowed && e.target === containerRef.current.firstChild;

    if (shouldDrop) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    if (isDragOver) {
      setIsDragOver(false);
    }
  };

  const handleDrop = () => {
    if (isDragOver) {
      handleDragLeave();
      dispatch(actions.builder.dropElement(path, projectId));
    }
  };

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, {
        [styles.containerActive]: isDragOver,
        [styles.containerDisabled]: !dropAllowed,
      })}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

DragOverContainer.propTypes = {
  path: PropTypes.string.isRequired,
  dropAllowed: PropTypes.bool.isRequired,
};

export default DragOverContainer;
