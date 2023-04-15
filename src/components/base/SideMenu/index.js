import React, { Fragment, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

import { PRIVATE_ROUTES, PROFILE, ROOT } from "../../../utils/constants/routes";

import Burger from "./molecules/Burger";
import CustomLink from "../Link";

import styles from "./index.module.scss";

const SideMenu = ({ className }) => {
  const { key } = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  const menuClassName = useMemo(() => {
    return classNames(styles.menuContainer, {
      [styles.menuContainerVisible]: isVisible,
    });
  }, [isVisible]);

  const routeKeys = useMemo(() => {
    const ALLOWED_ROUTES = [ROOT, PROFILE];
    const output = Object.keys(PRIVATE_ROUTES).filter((routeKey) =>
      ALLOWED_ROUTES.includes(routeKey)
    );

    return output;
  }, []);

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
          {routeKeys.map((routeKey, index) => {
            return (
              <Fragment key={routeKey}>
                {index > 0 && <div className={styles.linkSeparator} />}

                <CustomLink
                  to={routeKey}
                  className={({ isActive }) =>
                    classNames(styles.link, { [styles.linkActive]: isActive })
                  }
                >
                  {PRIVATE_ROUTES[routeKey].title}
                </CustomLink>
              </Fragment>
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
