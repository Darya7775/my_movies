import styled from "styled-components";

export const TooltipStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;

  box-shadow: 0 0 10px 0 #cb610b;
  background-color: #ffffff;
  padding: 5px 45px 5px 5px;
  min-height: 40px;

  &[data-show="true"] {
    display: block;
  }

  &[data-show="false"] {
    display: none;
  }

  & button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 8;
  }
`;
