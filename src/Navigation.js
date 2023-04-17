import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROOT } from "./utils/constants/routes";

import actions from "./actions";

import LoadingContainer from "./components/containers/LoadingContainer";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isLoading, currentSession } = useSelector((state) => state.session);

  const navigationRoutes = useMemo(() => {
    if (currentSession) {
      return PRIVATE_ROUTES;
    }

    return PUBLIC_ROUTES;
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

          <Route path="*" element={<Navigate to={ROOT} />} />
        </Routes>
      </LoadingContainer>
    </Router>
  );
};

export default Navigation;
