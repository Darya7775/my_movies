import styled from "styled-components";
import * as screen from "../../../styles/constants";
import prompt from "../../../assets/prompt.svg";

const WrapperInput = styled.div`
  display: grid;
  gap: 10px;

  position: relative;

  input {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 0 1px ${props => props.theme.colorBlue};
    background-color: #ffffff;

    font-size: 1em;
  }

  button {
    cursor: pointer;

    @media (min-width: ${screen._768_PX}) {
      background: url(${prompt}) 0 100% no-repeat;

      width: 24px;
      height: 24px;
      border: none;

      position: absolute;
      top: 40px;
      right: -30px;
    }
  }

  ul {
    margin: 0;
    padding: 0 0 0 20px;

    @media (min-width: ${screen._768_PX}) {
      width: 100%;
      padding: 10px 20px;

      position: absolute;
      bottom: 0;
      left: 111%;

      box-shadow: 0 0 9px 1px ${props => props.theme.colorBlue};
    }

    @media (min-width: ${screen._1024_PX}) {
      width: 25vw;
      bottom: -89%;
      left: 115%;
    }
  }
`;

export default WrapperInput;
