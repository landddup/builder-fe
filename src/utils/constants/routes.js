import SignIn from "../../components/pages/SignIn";
import SignUp from "../../components/pages/SignUp";
import AuthLayout from "../../components/layouts/AuthLayout";

export const ROOT = "/";
const SIGN_IN = `${ROOT}sign-in`;
const SIGN_UP = `${ROOT}sign-up`;

export const PUBLIC_ROUTES = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [SIGN_UP]: { element: SignUp, layout: AuthLayout },
};

export const PRIVATE_ROUTES = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [SIGN_UP]: { element: SignUp, layout: AuthLayout },
};
