import firebase from "../firebase-config";
import { createSession } from "../reducers/session";
import { TOAST_TYPES } from "../utils/constants/toast";
import actions from ".";
import api from "../apiSingleton";
import { PROVIDERS } from "../utils/constants/firebase";

const ERRORS = {
  "auth/email-already-in-use": "Email already in use",
  "auth/wrong-password": "Wrong password",
  "auth/user-not-found": "User not found",
  "auth/user-disabled": "Your account is disabled",
  "auth/too-many-requests": "Too many requests. Please try again later",
  default: "Something went wrong",
};

function updateSession(currentSession) {
  return async (dispatch) => {
    dispatch(createSession({ currentSession }));
  };
}

export function subscribeOnSessionChanges() {
  return (dispatch) => {
    try {
      firebase.auth.onAuthStateChanged(
        async (state) => await dispatch(updateSession(state))
      );
    } catch (error) {
      console.error("subscribeOnSessionChanges error: ", error);
    }
  };
}

export function verifyEmail(user) {
  return async (dispatch) => {
    try {
      await api.session.verifyEmail(user);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: `Link sent to ${user.email}`,
        })
      );
    } catch (error) {
      console.error("verifyEmail error: ", error);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code],
        })
      );
    }
  };
}

export function login({ email, password }) {
  return async (dispatch) => {
    try {
      await api.session.create(email, password);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Successfully signed in",
        })
      );
    } catch (error) {
      console.error("login error: ", error);

      await dispatch(
        actions.toast.show({
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
        actions.toast.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Account successfully created",
        })
      );
    } catch (error) {
      console.error("register error: ", error);

      await dispatch(
        actions.toast.show({
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
        actions.toast.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Successfully signed out",
        })
      );
    } catch (error) {
      console.error("logout error: ", error);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || ERRORS.default,
        })
      );
    }
  };
}

export function restorePassword({ email }) {
  return async (dispatch) => {
    try {
      await api.session.restorePassword(email);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: `Link was sent to ${email}`,
        })
      );
    } catch (error) {
      console.error("restorePassword error: ", error);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || ERRORS.default,
        })
      );
    }
  };
}

export function loginWithGoogle() {
  return async (dispatch) => {
    try {
      const currentSession = await api.session.createWithGoogle();

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Successfully signed in",
        })
      );

      return currentSession;
    } catch (error) {
      console.error("loginWithGoogle error: ", error);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || ERRORS.default,
        })
      );
    }
  };
}

export function reauthenticateWithPassword({ password }) {
  return async (dispatch) => {
    try {
      const credential = firebase.functions.auth.EmailAuthProvider.credential(
        firebase.auth.currentUser.email,
        password
      );

      const result = await firebase.functions.auth.reauthenticateWithCredential(
        firebase.auth.currentUser,
        credential
      );

      return result;
    } catch (error) {
      console.error("reauthenticateWithPassword error: ", error);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || ERRORS.default,
        })
      );
    }
  };
}

export function reauthenticateWithGoogle() {
  return async (dispatch) => {
    try {
      const result = await firebase.functions.auth.reauthenticateWithPopup(
        firebase.auth.currentUser,
        firebase.googleProvider
      );

      return result;
    } catch (error) {
      console.error("reauthenticateWithPassword error: ", error);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || ERRORS.default,
        })
      );
    }
  };
}

function reauthenticate(validInputs) {
  return async (dispatch) => {
    const providerId = firebase.auth.currentUser.providerData[0].providerId;

    let currentProfile;

    if (providerId === PROVIDERS.PASSWORD) {
      currentProfile = await dispatch(reauthenticateWithPassword(validInputs));
    }

    if (providerId === PROVIDERS.GOOGLE) {
      currentProfile = await dispatch(reauthenticateWithGoogle());
    }

    return currentProfile;
  };
}

export function updateProfile({ displayName, email, password }) {
  return async (dispatch) => {
    try {
      const currentUser = firebase.auth.currentUser;
      const currentSession = await dispatch(
        reauthenticate({ displayName, email, password })
      );

      if (!currentSession) {
        return;
      }

      if (currentUser.displayName !== displayName) {
        await api.session.updateProfile({ displayName });
      }

      if (currentUser.email !== email) {
        await api.session.updateEmail(email);
      }

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Profile successfully updated",
        })
      );
    } catch (error) {
      console.error("updateProfile error: ", error);

      await dispatch(
        actions.toast.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: ERRORS[error.code] || ERRORS.default,
        })
      );
    }
  };
}
