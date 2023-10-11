import styled from "styled-components";
import Container from "../../ui/container";
import * as screen from "../../../styles/constants";
import * as mix from "../../../styles/mixins";

export const MoviesSectionStyle = styled.section`
  width: 100%;
  margin-top: 20px;
`;

export const MoviesContainer = styled(Container)`
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const MoviesListStyle = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: grid;

  gap: 10px;
  grid-template-columns: 1fr 1fr;

  @media (min-width: ${screen._640_PX}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${screen._768_PX}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${screen._1366_PX}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: ${screen._1920_PX}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: ${screen._2500_PX}) {
    grid-template-columns: repeat(8, 1fr);
  }

  ${mix.size};
`;

export const MovieItemStyle = styled.li`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 0 8px 0 #958d8d;
`;
