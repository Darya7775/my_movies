import styled, { css } from "styled-components";

interface Props {
  children: JSX.Element[]
}

export const InputWrapper = styled.div<Props>`
  width: 100%;

  position: relative;

  label {
    position: absolute;
    z-index: 1;

    ${(props: Props) => {
    if(props.children[0].props.value !== "") {
      return css`
         top: 2px;
       left: 10px;
        font-size: 0.5em;
        line-height: 120%;
       `;
    }
    return css`
         top: 10px;
         left: 10px;
       `;
  }}
  }

  input {
    width: 100%;
    padding: 12px 8px 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 0 1px ${props => props.theme.colorBlue};

    font-size: 1em;

    background-color: #ffffff;
  }

  input:focus + label {
    top: 2px;
    font-size: 0.5em;
    line-height: 120%;
  }
`;
