import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

import { PRIVATE_ROUTES } from "../../../utils/constants/routes";

import Burger from "./molecules/Burger";
import CustomLink from "../Link";

import styles from "./index.module.scss";

const SideMenu = ({ className }) => {
  const { pathname } = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  const menuClassName = useMemo(() => {
    return classNames(styles.menuContainer, {
      [styles.menuContainerVisible]: isVisible,
    });
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      setIsVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className={classNames(styles.container, className)}>
      <Burger onClick={setIsVisible} isVisible={isVisible} />

      <div className={menuClassName}>
        <nav className={styles.nav}>
          {Object.keys(PRIVATE_ROUTES).map((routeKey) => {
            console.log(PRIVATE_ROUTES);
            return (
              <CustomLink key={routeKey} to={routeKey} className={styles.link}>
                {PRIVATE_ROUTES[routeKey].title}
              </CustomLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

SideMenu.propTypes = {
  className: PropTypes.string,
};

SideMenu.defaultProps = {
  className: "",
};

export default SideMenu;
