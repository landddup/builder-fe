import Base from "./Base.js";

import { authFunctions, firebaseAuth } from "../firebase-config";

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
      query: () => firebaseAuth.signOut(),
    });
  }

  restorePassword(email) {
    return this.apiClient.request({
      query: () => authFunctions.sendPasswordResetEmail(firebaseAuth, email),
    });
  }
}
