import Base from "./Base.js";

import { authFunctions } from "../firebase-config";

export default class SessionAPI extends Base {
  register(email, password) {
    return this.apiClient.request({
      query: (auth) =>
        authFunctions.createUserWithEmailAndPassword(auth, email, password),
    });
  }
}
