import React, { useMemo, useState } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

const Burger = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened((prev) => !prev);
  };

  const itemClassName = useMemo(() => {
    return classNames(styles.item, { [styles.itemOpened]: isOpened });
  }, [isOpened]);

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
