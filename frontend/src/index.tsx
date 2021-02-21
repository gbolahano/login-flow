import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Provider } from "react-redux";
const GlobalStyle = createGlobalStyle`
  * {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
  }
  body {
    font-size: 62.5%;
    font-family: 'Montserrat', sans-serif;
    /* overflow-y: hidden; */
  }
`;
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
