import { Link } from "react-router-dom";
import styled from "styled-components";
import * as screen from "../../../styles/constants";

export const WrapperMovieStyle = styled.div`
  display: grid;
  justify-items: center;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 1fr min-content;

  width: fit-content;

  position: relative;

  @media (hover: hover) {
    &:hover img {
      transform: scale(1.1);
    }

    &:hover h2 {
      text-decoration: underline ${props => props.theme.colorBlue};
    }
  }

  @media (min-width: ${screen._768_PX}) {
    gap: 5px;
  }
`;

export const MovieRating = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

  font-weight: 800;
  color: ${props => props.theme.colorBlue};

  background-color: #ffffff;
  border-radius: 50%;
  padding: 5px;
`;

export const LinkImg = styled(Link)`
  width: 100%;
  height: 100%;
  overflow: hidden;

  grid-area: 1/1/2/-1;
`;

export const LinkTitle = styled(Link)`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  grid-area: 2/1/3/2;

  h2 {
    margin: 0;
    font-weight: 600;
    font-size: 0.9em;
    line-height: 150%;
    text-align: center;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

    @media (min-width: ${screen._768_PX}) {
      font-size: 1em;
    }
  }
`;

export const ImgPoster = styled.img`
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 450px;
  min-height: 200px;
  object-fit: cover;

  @media (min-width: ${screen._768_PX}) {
    transition: transform .35s ease-out;
  }
`;

export const ListGenres = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  padding: 0 5px;
  text-align: center;

  grid-area: 4/1/-1/-1;
`;

export const Year = styled.span`
  grid-area: 3/1/4/-1;
`;
