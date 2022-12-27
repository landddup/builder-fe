import AuthLayout from "../../components/layouts/AuthLayout";
import SignIn from "../../components/pages/SignIn";
import SignUp from "../../components/pages/SignUp";
import RestorePassword from "../../components/pages/RestorePassword";

export const ROOT = "/";
export const SIGN_IN = `${ROOT}sign-in`;
export const SIGN_UP = `${ROOT}sign-up`;
export const RESTORE_PASSWORD = `${ROOT}restore-password`;

export const PUBLIC_ROUTES = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [SIGN_UP]: { element: SignUp, layout: AuthLayout },
  [RESTORE_PASSWORD]: { element: RestorePassword, layout: AuthLayout },
};

export const PRIVATE_ROUTES = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [SIGN_UP]: { element: SignUp, layout: AuthLayout },
};
