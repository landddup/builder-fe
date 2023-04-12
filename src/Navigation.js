import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./utils/constants/routes";

import { sessionActions } from "./actions";

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.session.currentSession);

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
      </Routes>
    </Router>
  );
};

export default Navigation;
