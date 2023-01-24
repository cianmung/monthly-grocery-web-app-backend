import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "../src/easypeasy/store";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { AuthProvider } from "./context/AuthProvider";
import { SelectedTypeProvider } from "./context/SelectedTypeProvider";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <AuthProvider>
          <SelectedTypeProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </SelectedTypeProvider>
        </AuthProvider>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
