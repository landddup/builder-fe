import queryString from "query-string";

const TIMEOUT_ERROR = 25000;

export default class ApiClient {
  constructor({
    apiUrl = "",
    onError = () => {},
    onConnectionError = () => {},
    onTimeoutError = () => {},
  }) {
    if (!apiUrl) {
      throw new Error("[apiUrl] required");
    }

    this.apiUrl = apiUrl;
    this.onError = onError;
    this.onConnectionError = onConnectionError;
    this.onTimeoutError = onTimeoutError;
  }

  async get(url, params) {
    return this.request({
      url,
      params,
      method: "GET",
    });
  }

  async post(url, payload = {}) {
    return this.request({
      url,
      method: "POST",
      body: payload,
    });
  }

  async put(url, payload = {}) {
    return this.request({
      url,
      method: "PUT",
      body: payload,
    });
  }

  async patch(url, payload = {}) {
    return this.request({
      url,
      method: "PATCH",
      body: payload,
    });
  }

  async delete(url, payload = {}) {
    return this.request({
      url,
      method: "DELETE",
      body: payload,
    });
  }

  setApiUrl(apiUrl) {
    this.apiUrl = apiUrl;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  async request({ url, method, params = {}, body }) {
    const query = Object.keys(params).length
      ? `?${queryString.stringify(params, { arrayFormat: "comma" })}`
      : "";
    const requestUrl = `${this.apiUrl}/${url}${query}`;
    const controller = new AbortController();
    const { signal } = controller;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        pragma: "no-cache",
        ...(this.lng ? { "accept-language": this.lng } : {}),
        ...(this.token ? { "X-AuthToken": this.token } : {}),
      },
      withCredentials: true,
      crossDomain: false,
      signal,
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    };

    setTimeout(() => controller.abort(), TIMEOUT_ERROR);

    try {
      const res = await fetch(requestUrl, options);

      let json = {};

      try {
        json = await res.json();
      } catch (error) {
        console.log("Wrong response error: ", error);

        const e = {
          code: "INVALID_RESPONSE",
          httpStatus: res.status,
        };

        throw e;
      }
      if (json.status === 0) throw json;

      return json;
    } catch (error) {
      if (error.status) {
        this.handleServerError(error);
      } else if (error.code === "INVALID_RESPONSE") {
        this.onConnectionError();
      } else if (error.name === "AbortError") {
        this.onTimeoutError();
      }

      throw error;
    }
  }

  handleServerError(error) {
    console.log("Server error: ", error);

    this.onError(error);
  }
}
