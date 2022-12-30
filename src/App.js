import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import Navigation from "./Navigation";
import ToastContainer from "./components/containers/ToastContainer";

function App() {
  return (
    <Provider store={store}>
      <Navigation />

      <ToastContainer />
    </Provider>
  );
}

export default App;
