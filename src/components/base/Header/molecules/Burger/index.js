import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";

const Burger = ({ collapsed, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.container, {
        [styles.containerVisible]: !collapsed,
      })}
    >
      <div className={styles.item} />
      <div className={styles.item} />
      <div className={styles.item} />
    </div>
  );
};

Burger.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Burger;
