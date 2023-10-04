import { css } from "styled-components";
import * as screen from "./constants";

export const size = css`
  line-height: 150%;

  @media (min-width: ${screen._1024_PX}) {
    font-size: 1.1em;
  }

  @media (min-width: ${screen._1536_PX}) {
    font-size: 1.3em;
  }

  @media (min-width: ${screen._1920_PX}) {
    font-size: 1.5em;
  }
`;
