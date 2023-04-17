import React from "react";

import { Logo } from "../../base";

import styles from "./index.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <Logo className={styles.logo} />

        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
