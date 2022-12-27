import React from "react";

import SvgIcon from "../../base/SvgIcon";

import styles from "./index.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <SvgIcon type="logo" className={styles.logo} />

      {children}
    </div>
  );
};

export default AuthLayout;
