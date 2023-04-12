import React from "react";

import Header from "../../base/Header";

import styles from "./index.module.scss";

const MainLayout = ({ children }) => {
  return (
    <section className={styles.container}>
      <Header />

      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default MainLayout;
