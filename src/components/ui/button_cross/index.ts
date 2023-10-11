import styled, { css } from "styled-components";
import Button from "../button";

const closeСross = css`
  content: "";
  position: absolute;
  top: 20px;
  left: 6px;
  z-index: 2;

  width: 26px;
  height: 2px;

  background-color: ${props => props.theme.colorBlue};
`;

const ButtonCross = styled(Button)`
  position: relative;

  width: 40px;
  height: 40px;

  &:after {
    ${closeСross};
    rotate: 45deg;
  }

  &:before {
    ${closeСross};
    rotate: -45deg;
  }
`;

export default ButtonCross;
