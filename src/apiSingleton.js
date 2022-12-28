import apiFactory from "./api";

function handleConnectError() {
  alert("Here will be connection error translate");
}

function handleTimeoutError() {
  alert("Here will be timeout error translate");
}

const api = apiFactory({
  onError: (error) => console.error("Request error: ", error),
  onConnectionError: handleConnectError,
  onTimeoutError: handleTimeoutError,
});

export default api;
