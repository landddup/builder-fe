import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import Navigation from "./Navigation";
import { ToastContainer, ModalContainer } from "./components/containers";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer>
        <ModalContainer>
          <Navigation />
        </ModalContainer>
      </ToastContainer>
    </Provider>
  );
}

export default App;
