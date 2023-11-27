import styled from "styled-components";

export const Ovarlay = styled.div`
  position: fixed;

  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, .8);
  z-index: 1000;
  overflow-y: auto;

  &[data-show="true"] {
    display: flex;
  }

  &[data-show="false"] {
    display: none;
  }
`;

export const Modal = styled.div`
  position: absolute;
  background-color: #ffffff;
  padding: 15px;
  z-index: 1000;
  width: 100%;
  border-radius: 0.5em;
`;
