import styled from "styled-components";

const Error = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.colorRed};

  color: ${props => props.theme.colorWhite};
`;

export default Error;
