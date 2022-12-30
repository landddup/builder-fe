import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Burger from "./molecules/Burger";

import styles from "./index.module.scss";
import actions from "../../../actions";

const Header = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.sideMenu);

  const handleCollapse = () => {
    if (collapsed) {
      dispatch(actions.sideMenuActions.showSideMenu());
    } else {
      dispatch(actions.sideMenuActions.hideSideMenu());
    }
  };

  return (
    <header className={styles.container}>
      <Burger collapsed={collapsed} onClick={handleCollapse} />
    </header>
  );
};

export default Header;
