import AuthLayout from "../../components/layouts/AuthLayout";
import MainLayout from "../../components/layouts/MainLayout";
import SignIn from "../../components/pages/SignIn";
import SignUp from "../../components/pages/SignUp";
import RestorePassword from "../../components/pages/RestorePassword";
import Main from "../../components/pages/Main";

export const ROOT = "/";
export const SIGN_IN = `${ROOT}sign-in`;
export const SIGN_UP = `${ROOT}sign-up`;
export const RESTORE_PASSWORD = `${ROOT}restore-password`;
export const PROFILE = `${ROOT}profile`;

export const PUBLIC_ROUTES = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [SIGN_UP]: { element: SignUp, layout: AuthLayout },
  [RESTORE_PASSWORD]: { element: RestorePassword, layout: AuthLayout },
};

export const PRIVATE_ROUTES = {
  [ROOT]: { element: Main, layout: MainLayout },
  [PROFILE]: { element: Main, layout: MainLayout },
};
