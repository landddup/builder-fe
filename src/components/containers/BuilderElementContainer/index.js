import React, { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import constants from "../../../utils/constants";
import actions from "../../../actions";

import styles from "./index.module.scss";
import { SvgButton, SvgIcon } from "../../shared";

const BuilderElementContainer = ({
  elements,
  currentNode,
  path,
  deleteAllowed,
  className,
  children,
}) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const containerRef = useRef();
  const crossRef = useRef();
  const arrowUpRef = useRef();
  const arrowDownRef = useRef();

  const [isDragOver, setIsDragOver] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const { canMoveUp, canMoveDown, currentElementIndex } = useMemo(() => {
    const elementsCount = Object.keys(elements).length;
    const lastElementIndex = elementsCount - 1;
    const currentElementIndex =
      +path.split(".")[path.split(".").length - 1] || 0;

    const canMove = elementsCount > 1;
    const canMoveUp = canMove && currentElementIndex > 0;
    const canMoveDown = canMove && currentElementIndex < lastElementIndex;

    return { canMoveUp, canMoveDown, currentElementIndex };
  }, [elements, path]);

  const handleDragOver = (e) => {
    const canDrop =
      !constants.builder.NOT_ALLOWED_DROP_ELEMENTS.includes(currentNode.type) &&
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
        e.target === crossRef.current ||
        e.target === arrowUpRef.current ||
        e.target === arrowDownRef.current);

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

  const moveElement = (direction) => async () => {
    const nextElementIndex =
      direction === "up" ? currentElementIndex - 1 : currentElementIndex + 1;

    await dispatch(
      actions.builder.replaceElements(
        path,
        currentElementIndex,
        nextElementIndex
      )
    );

    containerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  return (
    <div
      ref={containerRef}
      className={classNames(
        styles.container,
        styles[currentNode.type],
        className,
        {
          [styles.dragOverContainer]: isDragOver,
          [styles.settingsVisibleContainer]: settingsVisible,
        }
      )}
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

      {canMoveUp && (
        <SvgButton
          ref={arrowUpRef}
          icon="chevronUp"
          variant="contained"
          onClick={moveElement("up")}
          className={classNames(styles.arrowButton, styles.arrowUp, {
            [styles.arrowVisible]: settingsVisible,
          })}
        />
      )}

      {canMoveDown && (
        <SvgButton
          ref={arrowDownRef}
          icon="chevronDown"
          variant="contained"
          onClick={moveElement("down")}
          className={classNames(styles.arrowButton, styles.arrowDown, {
            [styles.arrowVisible]: settingsVisible,
          })}
        />
      )}
    </div>
  );
};

BuilderElementContainer.propTypes = {
  elements: PropTypes.object,
  path: PropTypes.string,
  currentNode: PropTypes.object,
  className: PropTypes.string,
  deleteAllowed: PropTypes.bool,
};

BuilderElementContainer.defaultProps = {
  elements: {},
  currentNode: {},
  path: "",
  className: "",
  deleteAllowed: true,
};

export default BuilderElementContainer;
