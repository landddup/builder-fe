import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useCurrentRoute = (routes) => {
  const { pathname } = useLocation();

  const currentRoute = useMemo(() => {
    return Object.keys(routes).find((route) => route === pathname);
  }, [routes, pathname]);

  return currentRoute;
};

export default useCurrentRoute;
