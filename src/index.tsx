import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/app/App";

import { Provider } from "react-redux";
import store from "./store";

import { ThemeProvider } from "styled-components";
import { theme } from "./components/theme";

// import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "./store";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>
);
