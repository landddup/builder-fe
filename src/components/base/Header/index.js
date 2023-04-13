import React from "react";
import { useDispatch } from "react-redux";

import { sessionActions } from "../../../actions";
import { PROFILE } from "../../../utils/constants/routes";

import Logo from "../Logo";
import SideMenu from "../SideMenu";
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

        <SideMenu className={styles.sideMenu} />

        <div className={styles.icons}>
          <CustomLink to={PROFILE}>
            <SvgButton
              icon="profile"
              variant="contained"
              size="default"
              title="Profile settings"
            />
          </CustomLink>

          <SvgButton
            icon="logout"
            variant="contained"
            size="default"
            title="Sign out"
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
