import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { SvgIcon } from "../";

import styles from "./index.module.scss";

const SvgButton = ({
  icon,
  variant,
  size,
  disabled,
  className,
  title,
  onClick,
}) => {
  return (
    <div
      title={title}
      {...(disabled ? {} : { onClick })}
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
      <SvgIcon type={icon} className={classNames(styles.icon)} />
    </div>
  );
};

SvgButton.propTypes = {
  icon: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

SvgButton.defaultProps = {
  variant: "outlined",
  size: "large",
  disabled: false,
  className: "",
  title: "",
  onClick: () => {},
};

export default SvgButton;
