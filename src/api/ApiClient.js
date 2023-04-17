import firebase from "../firebase-config";

export default class ApiClient {
  constructor({ onError = () => {} }) {
    this.onError = onError;
  }

  async request({ query, payload = {} }) {
    try {
      const res = await query(firebase.auth, { ...payload });

      return res;
    } catch (error) {
      this.onError(error);

      throw error;
    }
  }
}
