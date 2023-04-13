import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Burger from "./molecules/Burger";

import styles from "./index.module.scss";

const SideMenu = ({ className }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Burger />
    </div>
  );
};

SideMenu.propTypes = {
  className: PropTypes.string,
};

SideMenu.defaultProps = {
  className: "",
};

export default SideMenu;
