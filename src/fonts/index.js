import { createGlobalStyle } from "styled-components";

import RalewayWoff from "./raleway-variable-font_wght.woff";
import RalewayWoff2 from "./raleway-variable-font_wght.woff2";
import RalewayTTF from "./raleway-variable-font_wght.ttf";

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-style: normal;
    font-weight: 400 900;
    font-family: "Raleway";

    font-display: swap;
    src:
      url(${RalewayWoff2}) format("woff2"),
      url(${RalewayWoff}) format("woff"),
      url(${RalewayTTF}) format("truetype")
  }
`;
