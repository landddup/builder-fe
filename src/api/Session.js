import Base from "./Base.js";

import { authFunctions, googleProvider } from "../firebase-config";

export default class SessionAPI extends Base {
  register(email, password) {
    return this.apiClient.request({
      query: (auth) =>
        authFunctions.createUserWithEmailAndPassword(auth, email, password),
    });
  }

  create(email, password) {
    return this.apiClient.request({
      query: (auth) =>
        authFunctions.signInWithEmailAndPassword(auth, email, password),
    });
  }

  verifyEmail(user) {
    return this.apiClient.request({
      query: () => authFunctions.sendEmailVerification(user),
    });
  }

  destroy() {
    return this.apiClient.request({
      query: (auth) => auth.signOut(),
    });
  }

  restorePassword(email) {
    return this.apiClient.request({
      query: (auth) => authFunctions.sendPasswordResetEmail(auth, email),
    });
  }

  createWithGoogle() {
    return this.apiClient.request({
      query: (auth) => authFunctions.signInWithPopup(auth, googleProvider),
    });
  }

  updateUser(payload) {
    return this.apiClient.request({
      query: (auth) => authFunctions.updateProfile(auth.currentUser, payload),
    });
  }

  updateEmail(payload) {
    return this.apiClient.request({
      query: (auth) => authFunctions.updateEmail(auth.currentUser, payload),
    });
  }
}
