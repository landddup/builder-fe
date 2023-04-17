import React from "react";
import PropTypes from "prop-types";

import { Logo } from "../../base";
import { LoadingIndicator } from "../../shared";

import styles from "./index.module.scss";

const LoadingContainer = ({ isLoading, withLogo, width, height, children }) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        {withLogo && <Logo />}

        <LoadingIndicator
          color="#3f51b5"
          secondaryColor="#3f51b5"
          width={width}
          height={height}
        />
      </div>
    );
  }

  return <>{children}</>;
};

LoadingContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  withLogo: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

LoadingContainer.defaultProps = {
  withLogo: false,
  width: 40,
  height: 40,
};

export default LoadingContainer;
