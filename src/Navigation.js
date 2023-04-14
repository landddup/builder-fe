import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./utils/constants/routes";

import { sessionActions } from "./actions";

import { WithRedirect } from "./components/hoc";

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
    dispatch(sessionActions.subscribeOnSessionChanges());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initSession, []);

  return (
    <Router>
      <LoadingContainer isLoading={isLoading} withLogo>
        <WithRedirect routes={navigationRoutes}>
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
        </WithRedirect>
      </LoadingContainer>
    </Router>
  );
};

export default Navigation;
