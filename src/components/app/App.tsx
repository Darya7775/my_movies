import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles";
import { GlobalFonts } from "../../fonts";
import AppRoutes from "../routes";

const App: React.FC = () => {

  return (
    <BrowserRouter>

      <GlobalFonts />
      <GlobalStyles />

      <AppRoutes />

    </BrowserRouter>
  );
};

export default App;
