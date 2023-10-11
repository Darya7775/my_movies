import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkStyle = styled(Link)`
  display: inline-block;
  padding: 6px;
  border: 1px solid ${props => props.theme.colorBlue};
  border-radius: 5px;

  color: ${props => props.theme.colorBlue};

  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.colorActiveLink};
    }
  }
`;

export default LinkStyle;
