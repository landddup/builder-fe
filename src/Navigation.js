import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import constants from "./utils/constants";

import actions from "./actions";

import { LoadingContainer } from "./components/containers";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isLoading, currentSession } = useSelector((state) => state.session);

  const navigationRoutes = useMemo(() => {
    if (currentSession) {
      return constants.routes.PRIVATE_ROUTES;
    }

    return constants.routes.PUBLIC_ROUTES;
  }, [currentSession]);

  const initSession = () => {
    dispatch(actions.session.subscribeOnSessionChanges());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initSession, []);

  return (
    <Router>
      <LoadingContainer isLoading={isLoading} withLogo>
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

          <Route path="*" element={<Navigate to={constants.routes.ROOT} />} />
        </Routes>
      </LoadingContainer>
    </Router>
  );
};

export default Navigation;
