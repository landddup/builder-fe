import config from "./config";
import apiFactory from "./api";

function handleConnectError() {
  alert("Here will be connection error translate");
}

function handleTimeoutError() {
  alert("Here will be timeout error translate");
}

const api = apiFactory({
  apiUrl: config.REACT_APP_API_URL,
  onError: (error) => console.log("Connection error: ", error),
  onConnectionError: handleConnectError,
  onTimeoutError: handleTimeoutError,
});

export default api;

console.log(config);
