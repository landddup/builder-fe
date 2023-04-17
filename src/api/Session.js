import Base from "./Base.js";

import firebase from "../firebase-config";

export default class SessionAPI extends Base {
  register(email, password) {
    return this.apiClient.request({
      query: (auth) =>
        firebase.functions.auth.createUserWithEmailAndPassword(
          auth,
          email,
          password
        ),
    });
  }

  create(email, password) {
    return this.apiClient.request({
      query: (auth) =>
        firebase.functions.auth.signInWithEmailAndPassword(
          auth,
          email,
          password
        ),
    });
  }

  verifyEmail(user) {
    return this.apiClient.request({
      query: () => firebase.functions.auth.sendEmailVerification(user),
    });
  }

  destroy() {
    return this.apiClient.request({
      query: (auth) => auth.signOut(),
    });
  }

  restorePassword(email) {
    return this.apiClient.request({
      query: (auth) =>
        firebase.functions.auth.sendPasswordResetEmail(auth, email),
    });
  }

  createWithGoogle() {
    return this.apiClient.request({
      query: (auth) =>
        firebase.functions.auth.signInWithPopup(auth, firebase.googleProvider),
    });
  }

  updateProfile(payload) {
    return this.apiClient.request({
      query: (auth) =>
        firebase.functions.auth.updateProfile(auth.currentUser, payload),
    });
  }

  updateEmail(payload) {
    return this.apiClient.request({
      query: (auth) =>
        firebase.functions.auth.updateEmail(auth.currentUser, payload),
    });
  }
}
