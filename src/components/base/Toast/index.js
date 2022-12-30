import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";

const Toast = ({ type, message }) => {
  return (
    <div className={classNames(styles.container)}>
      <div
        className={classNames(styles.content, styles[type], {
          [styles.visible]: !!message,
        })}
      >
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.number,
};

Toast.defaultProps = {
  type: "",
  message: "",
  duration: 3000,
};

export default Toast;
