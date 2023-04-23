import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import constants from "../../../utils/constants";
import actions from "../../../actions";

import styles from "./index.module.scss";

const DragOverContainer = ({ path, type, children }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const containerRef = useRef();

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    const shouldDrop =
      !constants.builder.NOT_ALLOWED_DROP_ELEMENTS.includes(type) &&
      (e.target === containerRef.current ||
        e.target === containerRef.current.firstChild);

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
  path: PropTypes.string,
  type: PropTypes.string,
};

DragOverContainer.defaultProps = {
  path: "",
  type: "",
};

export default DragOverContainer;
