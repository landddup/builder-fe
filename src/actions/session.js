import { firebaseAuth } from "../firebase-config";
import { createSession } from "../reducers/session";
import { TOAST_TYPES } from "../utils/constants/toast";
import { toastActions } from ".";
import api from "../apiSingleton";

const ERRORS = {
  "auth/email-already-in-use": "Email already in use",
  "auth/wrong-password": "Wrong password",
  "auth/user-not-found": "User not found",
  "auth/user-disabled": "Your account is disabled",
  "auth/too-many-requests": "Too many requests. Please try again later",
};

function updateSession(session) {
  return async (dispatch) => {
    dispatch(createSession({ session }));
  };
}

export function subscribeOnSessionChanges() {
  return (dispatch) => {
    try {
      firebaseAuth.onAuthStateChanged(
        async (state) => await dispatch(updateSession(state))
      );
    } catch (error) {
      console.error("subscribeOnSessionChanges error: ", error);
    }
  };
}

function verifyEmail(user) {
  return async () => {
    try {
      await api.session.verifyEmail(user);
    } catch (error) {
      console.error("verifyEmail error: ", error);
    }
  };
}

export function login({ email, password }) {
  return async (dispatch) => {
    try {
      await api.session.create(email, password);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Successfully logged in",
        })
      );
    } catch (error) {
      console.error("login error: ", error);

      await dispatch(
        toastActions.show({
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
      const userCredential = await api.session.register(email, password);

      await dispatch(verifyEmail(userCredential.user));
      await dispatch(login({ email, password }));

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Account successfully created",
        })
      );
    } catch (error) {
      console.error("register error: ", error);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code],
        })
      );
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await api.session.destroy();

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Successfully logged out",
        })
      );
    } catch (error) {
      console.error("logout error: ", error);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || "Something went wrong",
        })
      );
    }
  };
}

export function restorePassword(email) {
  return async (dispatch) => {
    try {
      await api.session.restorePassword(email);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: `Link was sent to ${email}`,
        })
      );
    } catch (error) {
      console.error("restorePassword error: ", error);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || "Something went wrong",
        })
      );
    }
  };
}

export function loginWithGoogle() {
  return async (dispatch) => {
    try {
      await api.session.createWithGoogle();

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Successfully logged in",
        })
      );
    } catch (error) {
      console.error("loginWithGoogle error: ", error);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || "Something went wrong",
        })
      );
    }
  };
}
