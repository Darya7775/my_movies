import styled from "styled-components";
import * as screen from "../../../styles/constants";

export const ImgMovie = styled.img`
  width: 100%;
  object-fit: contain;
  float: left;

  &[data-card="true"] {
    width: 100%;
    max-width: 300px;
    height: 100%;
    max-height: 450px;
    min-height: 200px;
    object-fit: cover;

    @media (min-width: ${screen._768_PX}) {
      transition: transform .35s ease-out;
    }
  }
`;
