import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";

axios
  .get("/api/auth/user")
  .then((res) => {
    ReactDOM.render(
      <BrowserRouter>
        <App initUser={res.data} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  })
  .catch((err) => {
    console.error(err);
  });
