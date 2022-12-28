import { firebaseAuth } from "../firebase-config";
import { createSession } from "../reducers/session";
import actions from "./index";
import api from "../apiSingleton";
import { TOAST_TYPES } from "../utils/constants/toast";

const ERRORS = {
  "auth/email-already-in-use": "Email already in use",
  "auth/wrong-password": "Wrong password",
  "auth/user-not-found": "User not found",
};

function updateSession(session) {
  return async (dispatch) => {
    dispatch(createSession({ session }));
  };
}

export function checkSession() {
  return async (dispatch) => {
    firebaseAuth.onAuthStateChanged(
      async (state) => await dispatch(updateSession(state))
    );
  };
}

export function login({ email, password }) {
  return async (dispatch) => {
    try {
      await api.session.create(email, password);
      await dispatch(checkSession());

      await dispatch(
        actions.toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Successfully logged in",
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

export function register({ email, password }) {
  return async (dispatch) => {
    try {
      await api.session.register(email, password);
      await dispatch(login(email, password));

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
