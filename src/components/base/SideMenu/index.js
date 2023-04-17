import React, { Fragment, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

import constants from "../../../utils/constants";

import { Burger } from "./molecules";
import { CustomLink } from "../../shared";

import styles from "./index.module.scss";

const SideMenu = ({ className }) => {
  const { key } = useLocation();

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
  }, [key]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
    } else {
      document.body.style.overflow = "visible";
      document.body.style.position = "static";
    }
  }, [isVisible]);

  return (
    <div className={classNames(styles.container, className)}>
      <Burger onClick={setIsVisible} isVisible={isVisible} />

      <div className={menuClassName}>
        <nav className={styles.nav}>
          {Object.keys(constants.routes.SIDE_MENU_ROUTES).map(
            (routeKey, index) => {
              return (
                <Fragment key={routeKey}>
                  {index > 0 && <div className={styles.linkSeparator} />}

                  <CustomLink
                    to={routeKey}
                    className={({ isActive }) =>
                      classNames(styles.link, { [styles.linkActive]: isActive })
                    }
                  >
                    {constants.routes.SIDE_MENU_ROUTES[routeKey]}
                  </CustomLink>
                </Fragment>
              );
            }
          )}
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
