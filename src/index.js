import React from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import rootSaga from "./config/saga";
import history from "./config/services/historyService";
import httpService from "./config/services/httpService";
import configureStore from "./config/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const store = configureStore();
store.runSaga(rootSaga);
httpService.setupInterceptors(store, history);

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
