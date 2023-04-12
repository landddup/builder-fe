import React from "react";
import { useDispatch } from "react-redux";

import { sessionActions } from "../../../actions";
import { USER } from "../../../utils/constants/routes";

import Logo from "../Logo";
import CustomLink from "../Link";
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

        <div className={styles.icons}>
          <CustomLink to={USER}>
            <SvgButton icon="user" variant="contained" size="default" />
          </CustomLink>

          <SvgButton
            icon="logout"
            variant="contained"
            size="default"
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
