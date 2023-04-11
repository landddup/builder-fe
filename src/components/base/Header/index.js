import React from "react";
import { useDispatch } from "react-redux";

import { sessionActions } from "../../../actions";

import Logo from "../Logo";
import SvgButton from "../SvgButton";

import styles from "./index.module.scss";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(sessionActions.logout());
  };

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Logo className={styles.logo} />

        <SvgButton
          icon="logout"
          iconClassName={styles.icon}
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;
