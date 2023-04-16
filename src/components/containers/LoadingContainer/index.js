import React from "react";
import PropTypes from "prop-types";

import Logo from "../../base/Logo";
import LoadingIndicator from "../../shared/LoadingIndicator";

import styles from "./index.module.scss";

const LoadingContainer = ({ isLoading, withLogo, children }) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        {withLogo && <Logo />}

        <LoadingIndicator
          color="#3f51b5"
          secondaryColor="#3f51b5"
          width={40}
          height={40}
        />
      </div>
    );
  }

  return <>{children}</>;
};

LoadingContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  withLogo: PropTypes.bool,
};

LoadingContainer.defaultProps = {
  withLogo: false,
};

export default LoadingContainer;
