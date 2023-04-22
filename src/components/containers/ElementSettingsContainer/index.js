import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import actions from "../../../actions";

import { SvgIcon } from "../../shared";

import styles from "./index.module.scss";

const ElementSettingsContainer = ({ path, type, children }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const containerRef = useRef();
  const crossRef = useRef();

  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleMouseEnter = (e) => {
    const shouldSettings =
      e.target === containerRef.current.childNodes[0].childNodes[0] ||
      e.target === crossRef.current;

    if (shouldSettings) {
      setSettingsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setSettingsVisible(false);
  };

  const handleDelete = () => {
    dispatch(actions.builder.deleteElement(path, projectId));
  };

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, styles[type], {
        [styles.containerActive]: settingsVisible,
      })}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
    >
      {children}

      <div
        ref={crossRef}
        className={classNames(styles.crossContainer, {
          [styles.crossContainerActive]: settingsVisible,
        })}
        onClick={handleDelete}
      >
        <SvgIcon type="cross" />
      </div>
    </div>
  );
};

ElementSettingsContainer.propTypes = {
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ElementSettingsContainer;
