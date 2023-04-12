import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { ROOT } from "../../utils/constants/routes";

import useCurrentRoute from "../../hooks/useCurrentRoute";

const WithRedirect = ({ routes, children }) => {
  const currentRoute = useCurrentRoute(routes);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentRoute) {
      navigate(ROOT, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute]);

  return <>{children}</>;
};

WithRedirect.propTypes = {
  routes: PropTypes.object,
};

WithRedirect.defaultProps = {
  routes: {},
};

export default WithRedirect;
