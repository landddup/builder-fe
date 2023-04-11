import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { sessionActions } from "./actions";

import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROOT } from "./utils/constants/routes";

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.session.session);
  const navigationRoutes = useMemo(() => {
    if (isAuth) {
      return PRIVATE_ROUTES;
    }

    return PUBLIC_ROUTES;
  }, [isAuth]);

  const initSession = () => {
    dispatch(sessionActions.subscribeOnSessionChanges());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initSession, []);

  return (
    <Router>
      <Routes>
        {Object.keys(navigationRoutes).map((routeKey) => {
          const { element: Element, layout: Layout } =
            navigationRoutes[routeKey];

          return (
            <Route
              key={routeKey}
              path={routeKey}
              element={
                <Layout>
                  <Element />
                </Layout>
              }
            />
          );
        })}

        <Route path="*" element={<Navigate to={ROOT} />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
