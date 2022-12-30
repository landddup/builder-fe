import React from "react";
import { useSelector } from "react-redux";

import Logo from "../../base/Logo";
import LoadingIndicator from "../../base/LoadingIndicator";

import styles from "./index.module.scss";

const AuthLayout = ({ children }) => {
  const { isLoading } = useSelector((state) => state.session);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <Logo className={styles.logo} />
          <LoadingIndicator
            color="#3f51b5"
            secondaryColor="#3f51b5"
            width={40}
            height={40}
          />
        </div>
      ) : (
        <div className={styles.content}>
          <Logo className={styles.logo} />

          {children}
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
