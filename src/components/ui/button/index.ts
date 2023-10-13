import styled from "styled-components";
import * as screen from "../../../styles/constants";

const Button = styled.button`
  display: block;
  border: none;

  border-radius: 5px;
  padding: 10px;
  background-color: ${props => props.theme.colorWhite};

  box-shadow: 0 0 0 1px ${props => props.theme.colorBlue};
  color: ${props => props.theme.colorBlue};

  &[data-red="true"] {
    box-shadow: 0 0 0 1px ${props => props.theme.colorRed};
    color: ${props => props.theme.colorRed};
  }

  cursor: pointer;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.colorActiveLink};
      transition: background-color 1s;
    }
  }

  &:disabled {
    background-color: ${props => props.theme.colorActiveLink};
    opacity: 0.5;

    cursor: auto;

    &:hover {
      background-color: ${props => props.theme.colorActiveLink};
    }
  }

  @media (min-width: ${screen._1024_PX}) {
    font-size: 0.8em;
    line-height: 1em;
  }

  @media (min-width: ${screen._1536_PX}) {
    font-size: 1em;
    line-height: 1.3em;
  }

  @media (min-width: ${screen._1920_PX}) {
    font-size: 0.9em;
    line-height: 1.5em;
  }
`;

export default Button;
