import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/Store";

import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          theme="dark"
          position="bottom-right"
          autoClose={1200}
          closeOnClick
          pauseOnHover={false}
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
