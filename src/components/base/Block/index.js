import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";
import Button from "../Button";

const Block = ({
  title,
  button,
  isLoading,
  stickyHeader,
  onClick,
  children,
}) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.relative]: stickyHeader,
      })}
    >
      <div
        className={classNames(styles.header, { [styles.sticky]: stickyHeader })}
      >
        <h2 className={styles.title}>{title}</h2>

        {button && (
          <Button
            label={button}
            isLoading={isLoading}
            onClick={onClick}
            className={styles.button}
          />
        )}
      </div>

      {children}
    </div>
  );
};

Block.propTypes = {
  title: PropTypes.string,
  button: PropTypes.string,
  isLoading: PropTypes.bool,
  stickyHeader: PropTypes.bool,
  onClick: PropTypes.func,
};

Block.defaultProps = {
  title: "",
  button: "",
  isLoading: false,
  stickyHeader: false,
  onClick: () => {},
};

export default Block;
