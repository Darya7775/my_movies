import styled, { css } from "styled-components";
import Button from "../../ui/button";
import ButtonCross from "../../ui/button_cross";
import * as screen from "../../../styles/constants";
import abacus from "../../../assets/abacus.svg";

const styleWrapper = css`
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
    position: relative;
    top: 0;

    width: fit-content;
    flex-direction: row;
  }

  @media (min-width: ${screen._1024_PX}) {
    flex-direction: row;
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
  ${styleWrapper};
`;

export const WrapperSelect = styled.div`
  ${styleWrapper};

  &[data-open="false"] {
    display: none;
  }

  &[data-open="true"] {
    display: flex;
  }

  @media (min-width: ${screen._768_PX}) {
    position: absolute;
    top: 115%;
  }
`;

export const ButtonOptions = styled.button`
  display: block;
  width: 42px;
  border: none;
  background: url(${abacus}) 0 no-repeat;

  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.colorActiveLink};
      transition: background-color 1s;
    }
  }
`;
