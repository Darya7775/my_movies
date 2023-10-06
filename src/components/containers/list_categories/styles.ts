import styled from "styled-components";
import Button from "../../ui/button";
import * as screen from "../../../styles/constants";

export const Wrapper = styled.div`
  position: relative;
`;

export const ListCategories = styled.ul`
  max-width: 1000px;
  margin: 0;
  padding: 0;
  list-style: none;

  position: absolute;

  display: grid;
  gap: 1px;

  @media (min-width: ${screen._768_PX}) {
    position: static;

    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }

  @media (min-width: ${screen._1024_PX}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media (min-width: ${screen._1280_PX}) {
    gap: 15px;
  }

  @media (min-width: ${screen._2500_PX}) {
    grid-area: 1/3/-1/-1;
  }
`;

export const ButtonCategoriesList = styled(Button)`
  width: 100%;
  padding: 7px;

  text-align: start;

  &:disabled {
    background-color: ${props => props.theme.colorBlue};
    color: ${props => props.theme.colorWhite};

    cursor: auto;
    opacity: 1;

    &:hover {
      background-color: ${props => props.theme.colorBlue};
    }
  }

  @media (min-width: ${screen._1366_PX}) {
    padding: 10px;
  }
`;
