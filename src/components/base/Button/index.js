import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import LoadingIndicator from "../LoadingIndicator";

import styles from "./index.module.scss";

const LOADER_COLORS = {
  contained: "#ffffff",
  outlined: "#7986cb",
  text: "#7986cb",
  link: "#7986cb",
};

const Button = ({
  variant,
  size,
  label,
  disabled,
  type,
  isLoading,
  onClick,
  className,
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[size],
        styles[variant],
        className
      )}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <LoadingIndicator
          color={LOADER_COLORS[variant]}
          secondaryColor={LOADER_COLORS[variant]}
        />
      ) : (
        label
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: "contained",
  size: "default",
  disabled: false,
  type: "default",
  isLoading: false,
  onClick: () => {},
  className: "",
};

export default Button;
