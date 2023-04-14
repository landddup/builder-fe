import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

const Burger = ({ isVisible, onClick }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened((prev) => !prev);
    onClick(!isOpened);
  };

  const itemClassName = useMemo(() => {
    return classNames(styles.item, { [styles.itemOpened]: isOpened });
  }, [isOpened]);

  useEffect(() => {
    if (isVisible !== isOpened) {
      setIsOpened(isVisible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <button className={styles.container} onClick={handleClick}>
      <div
        className={classNames(styles.items, { [styles.itemsOpened]: isOpened })}
      >
        <span className={itemClassName} />
        <span className={itemClassName} />
        <span className={itemClassName} />
      </div>
    </button>
  );
};

export default Burger;
