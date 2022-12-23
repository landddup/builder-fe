import React from "react";

import styles from "./index.module.scss";

const AuthLayout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default AuthLayout;
