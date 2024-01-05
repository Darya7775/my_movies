import styled from "styled-components";
import Container from "../../ui/container";
import { Link } from "react-router-dom";
import * as mix from "../../../styles/mixins";
import * as screen from "../../../styles/constants";

export const Header = styled.header`
  position: sticky;
  top: -1px;
  left: 0;
  z-index: 5;

  width: 100%;
  box-shadow: 0 0 10px 0 ${props => props.theme.colorBlue};
  background-color: ${props => props.theme.colorWhite};

  ${mix.size};
`;

export const HeaderContainer = styled(Container)`
  padding-top: 10px;
  padding-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${screen._1024_PX}) {
    display: grid;
    grid-template-columns: max-content 1fr 46%;
    gap: 5px 30px;
  }

  @media (min-width: ${screen._1280_PX}) {
    column-gap: 100px;
  }

  @media (min-width: ${screen._1600_PX}) {
    row-gap: 30px;
  }

  @media (min-width: ${screen._1920_PX}) {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  @media (min-width: ${screen._2500_PX}) {
    grid-template-columns: max-content 1fr 1fr;
    grid-template-rows: max-content;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;

  & span {
    display: none;

    @media (min-width: ${screen._768_PX}) {
      display: block;
    }
  }
`;
