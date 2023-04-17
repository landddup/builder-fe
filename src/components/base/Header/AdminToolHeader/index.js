import React from "react";
import { useDispatch } from "react-redux";

import actions from "../../../../actions";
import constants from "../../../../utils/constants";

import { Logo, SideMenu } from "../../";
import { CustomLink, SvgButton } from "../../../shared";

import styles from "./index.module.scss";

const AdminToolHeader = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.session.logout());
  };

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Logo className={styles.logo} />

        <SideMenu className={styles.sideMenu} />

        <div className={styles.icons}>
          <CustomLink to={constants.routes.PROFILE}>
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

export default AdminToolHeader;
