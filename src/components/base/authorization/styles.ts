import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "../../ui/container";
import * as mix from "../../../styles/mixins";

export const Wrapper = styled(Container)`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;

  ${mix.size};
`;

export const AutLinkSingIn = styled(Link)`
  padding: 0px 6px;
  border: 1px solid ${props => props.theme.colorBlue};
  border-radius: 5px;

  color: ${props => props.theme.colorBlue};

  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.colorActiveLink};
    }
  }
`;
