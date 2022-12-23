import React, { useMemo } from "react";

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROOT } from "./utils/constants/routes";

const Navigation = () => {
  const isAuth = false;
  const navigationRoutes = useMemo(() => {
    if (isAuth) {
      return PRIVATE_ROUTES;
    }

    return PUBLIC_ROUTES;
  }, [isAuth]);

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
