import ApiClient from "./ApiClient";
import SessionAPI from "./Session";

export default function apiConstruct({
  onError,
  onConnectionError,
  onTimeoutError,
}) {
  const apiClient = new ApiClient({
    onError,
    onConnectionError,
    onTimeoutError,
  });

  return {
    apiClient,
    session: new SessionAPI({ apiClient }),
  };
}
