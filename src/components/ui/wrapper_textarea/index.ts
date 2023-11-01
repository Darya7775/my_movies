import styled from "styled-components";

const WrapperTextarea = styled.div`
  display: grid;
  gap: 10px;

  position: relative;

  label {
    display: none;
  }

  textarea {
    resize: none;
    overflow: hidden;
    border: none;
    border-bottom: 2px solid ${props => props.theme.colorBlue};
    padding: 5px;
  }

`;

export default WrapperTextarea;
