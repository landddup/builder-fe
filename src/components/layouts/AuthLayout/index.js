import React from "react";
import { useSelector } from "react-redux";

import Logo from "../../base/Logo";
import LoadingIndicator from "../../base/LoadingIndicator";

import styles from "./index.module.scss";
import ToastContainer from "../../containers/ToastContainer";

const AuthLayout = ({ children }) => {
  const { isLoading } = useSelector((state) => state.session);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo className={styles.logo} />

        {isLoading ? (
          <LoadingIndicator
            color="#3f51b5"
            secondaryColor="#3f51b5"
            width={40}
            height={40}
          />
        ) : (
          children
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
