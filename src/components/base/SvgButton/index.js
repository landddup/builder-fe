import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

const SvgButton = ({ icon, variant, size, disabled, onClick, className }) => {
  return (
    <div
      className={classNames(
        styles.iconContainer,
        styles[size],
        styles[variant],
        {
          [styles.containedDisabled]: variant === "contained" && disabled,
          [styles.outlinedDisabled]: variant === "outlined" && disabled,
        },
        className
      )}
    >
      <SvgIcon
        type={icon}
        className={classNames(styles.icon)}
        {...(disabled ? {} : { onClick })}
      />
    </div>
  );
};

SvgButton.propTypes = {
  icon: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

SvgButton.defaultProps = {
  variant: "outlined",
  size: "large",
  disabled: false,
  className: "",
  onClick: () => {},
};

export default SvgButton;
