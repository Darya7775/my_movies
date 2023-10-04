import styled from "styled-components";
import Button from "../../ui/button";
import ButtonCross from "../../ui/button_cross";
import * as screen from "../../../styles/constants";

export const FormSearch = styled.form`
  width: 100vw;
  padding: 0 2px;
  position: absolute;
  top: 100%;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (min-width: ${screen._768_PX}) {
    position: static;
    width: fit-content;
  }

  @media (min-width: ${screen._1024_PX}) {
    flex-direction: row;
    grid-area: 1/2/2/-1;
    gap: 15px;
  }

  @media (min-width: ${screen._1536_PX}) {
    gap: 25px;
  }
`;

export const ButtonOpen = styled(Button)`
  border-radius: 50%;
  padding: 5px;
`;

export const ButtonCloseSearch = styled(ButtonCross)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 5px;

  input {
    height: 100%;
  }

  @media (min-width: ${screen._768_PX}) {
    justify-content: space-between;
  }

  @media (min-width: ${screen._1024_PX}) {
    gap: 8px;
  }
`;
