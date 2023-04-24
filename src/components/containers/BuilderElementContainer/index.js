import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import constants from "../../../utils/constants";
import actions from "../../../actions";

import styles from "./index.module.scss";
import { SvgIcon } from "../../shared";

const BuilderElementContainer = ({
  type,
  path,
  deleteAllowed,
  className,
  children,
}) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const containerRef = useRef();
  const crossRef = useRef();

  const [isDragOver, setIsDragOver] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleDragOver = (e) => {
    const canDrop =
      !constants.builder.NOT_ALLOWED_DROP_ELEMENTS.includes(type) &&
      (e.target === containerRef.current ||
        e.target === containerRef.current.childNodes[0]);

    if (canDrop) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = () => {
    if (isDragOver) {
      handleDragLeave();

      dispatch(actions.builder.dropElement(path, projectId));
    }
  };

  const handleMouseOver = (e) => {
    const canShowSettings =
      !isDragOver &&
      deleteAllowed &&
      (e.target === containerRef.current.childNodes[0] ||
        e.target === containerRef.current ||
        e.target === crossRef.current);

    if (canShowSettings) {
      setSettingsVisible(true);
    }
  };

  const handleMouseOut = () => {
    setSettingsVisible(false);
  };

  const handleDelete = () => {
    dispatch(actions.builder.deleteElement(path, projectId));
  };

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, styles[type], className, {
        [styles.dragOverContainer]: isDragOver,
        [styles.settingsVisibleContainer]: settingsVisible,
      })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}

      <div
        ref={crossRef}
        className={classNames(styles.crossContainer, {
          [styles.crossContainerVisible]: settingsVisible,
        })}
        onClick={handleDelete}
      >
        <SvgIcon type="cross" />
      </div>
    </div>
  );
};

BuilderElementContainer.propTypes = {
  path: PropTypes.string,
  type: PropTypes.string,
  deleteAllowed: PropTypes.bool,
};

BuilderElementContainer.defaultProps = {
  path: "",
  type: "",
  deleteAllowed: true,
};

export default BuilderElementContainer;
