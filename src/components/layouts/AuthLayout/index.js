import React from "react";
import Logo from "../../base/Logo";

import styles from "./index.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo className={styles.logo} />

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
