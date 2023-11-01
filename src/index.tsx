import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/app/App";

import { Provider } from "react-redux";
import store from "./store";

import { ThemeProvider } from "styled-components";
import { theme } from "./components/theme";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
