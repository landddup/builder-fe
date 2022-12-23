import ApiClient from "./ApiClient";
import SessionAPI from "./Session";

export default function apiConstruct({
  apiUrl,
  onError,
  onConnectionError,
  onTimeoutError,
}) {
  if (!apiUrl) {
    throw new Error("[apiUrl] required");
  }

  const apiClient = new ApiClient({
    apiUrl,
    onError,
    onConnectionError,
    onTimeoutError,
  });

  return {
    apiClient,
    session: new SessionAPI({ apiClient }),
  };
}
