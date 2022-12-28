import { firebaseAuth } from "../firebase-config";

export default class ApiClient {
  constructor({ onError = () => {} }) {
    this.onError = onError;
  }

  async request({ query, payload = {} }) {
    try {
      const res = await query(firebaseAuth, { ...payload });

      return res;
    } catch (error) {
      this.onError(error);

      throw error;
    }
  }
}
