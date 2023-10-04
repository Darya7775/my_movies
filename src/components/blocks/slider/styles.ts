import styled, { css } from "styled-components";
import prev from "../../../assets/slider_arrow_prev.svg";
import * as screen from "../../../styles/constants";

const arrows = css`
  position: absolute;
  top: 50%;
  z-index: 3;

  width: 20px;
  height: 40px;
  background-image: url(${prev});
  background-repeat: no-repeat;
  background-position: 25% 50%;
  background-color: transparent;

  border: none;
  box-shadow: 0 0 8px 1px #767e85;

  cursor: pointer;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 0 8px 1px ${props => props.theme.colorActiveLink};
    }
  }

  @media (min-width: ${screen._1600_PX}) {
    width: 25px;
    height: 45px;

    background-position: 45% 50%;
  }

  @media (min-width: ${screen._1920_PX}) {
    width: 35px;
    height: 55px;
    background-position: 40% 50%;
    background-size: 20px 20px;
  }
`;

// styles
export const WrapperSlider = styled.div`
  position: relative;
`;

export const Prev = styled.button`
  ${arrows};

  left: 0;

  @media (min-width: ${screen._768_PX}) {
    left: -25px;
  }

  @media (min-width: ${screen._1600_PX}) {
    left: -45px;
  }

  @media (min-width: ${screen._1920_PX}) {
    left: -55px;
  }
`;

export const Next = styled.button`
  ${arrows};

  right: 0;
  transform: rotate(180deg);

  @media (min-width: ${screen._768_PX}) {
    right: -25px;
  }

  @media (min-width: ${screen._1600_PX}) {
    right: -45px;
  }

  @media (min-width: ${screen._1920_PX}) {
    right: -55px;
  }
`;
