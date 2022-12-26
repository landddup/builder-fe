import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";

const Button = ({ variant, size, label, disabled, type, onClick }) => {
  return (
    <button
      className={classNames(styles.button, styles[size], styles[variant])}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: "contained",
  size: "default",
  disabled: false,
  type: "default",
  onClick: () => {},
};

export default Button;
