import { firebaseAuth } from "../firebase-config";
import { createSession } from "../reducers/session";
import actions from "./index";
import api from "../apiSingleton";
import { TOAST_TYPES } from "../utils/constants/toast";

const ERRORS = { "auth/email-already-in-use": "Email already in use" };

function updateSession(session) {
  return async (dispatch) => {
    dispatch(createSession({ session }));
  };
}

export function checkSession() {
  return async (dispatch) => {
    const { currentUser } = firebaseAuth;

    await dispatch(updateSession(currentUser));
  };
}

export function register({ email, password }) {
  return async (dispatch) => {
    try {
      await api.session.register(email, password);
      await dispatch(checkSession());

      await dispatch(
        actions.toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Account successfully created",
        })
      );
    } catch (error) {
      console.error("register error: ", error);

      await dispatch(
        actions.toastActions.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code],
        })
      );
    }
  };
}
