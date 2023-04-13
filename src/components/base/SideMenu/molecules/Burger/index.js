import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import SvgIcon from "../../../SvgIcon";

import styles from "./index.module.scss";

const Burger = ({ isVisible, onClick }) => {
  const [isOpened, setIsOpened] = useState(isVisible);

  const handleClick = () => {
    setIsOpened((prev) => !prev);
    onClick(!isOpened);
  };

  const itemClassName = useMemo(() => {
    return classNames(styles.item, { [styles.itemOpened]: isOpened });
  }, [isOpened]);

  useEffect(() => {
    if (isOpened !== isVisible) {
      setIsOpened(isVisible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <button className={styles.container} onClick={handleClick}>
      <div
        className={classNames(styles.items, { [styles.itemsOpened]: isOpened })}
      >
        <SvgIcon type="line" className={itemClassName} />
        <SvgIcon type="line" className={itemClassName} />
        <SvgIcon type="line" className={itemClassName} />
      </div>
    </button>
  );
};

Burger.propTypes = {
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
};

Burger.defaultProps = {
  isVisible: false,
  onClick: () => {},
};

export default Burger;
