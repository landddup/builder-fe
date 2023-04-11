import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

const SvgButton = ({ icon, onClick, containerClassName, iconClassName }) => {
  return (
    <div className={classNames(styles.iconContainer, containerClassName)}>
      <SvgIcon
        type={icon}
        className={classNames(styles.icon, iconClassName)}
        onClick={onClick}
      />
    </div>
  );
};

SvgButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  containerClassName: PropTypes.string,
  iconClassName: PropTypes.string,
};

SvgButton.defaultProps = {
  onClick: () => {},
  containerClassName: "",
  iconClassName: "",
};

export default SvgButton;
