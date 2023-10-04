import { Link } from "react-router-dom";
import styled from "styled-components";
import * as screen from "../../../styles/constants";

export const LinkMovieStyle = styled(Link)`
  display: grid;
  justify-items: center;

  width: fit-content;

  position: relative;

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

  @media (hover: hover) {
    &:hover img {
      transform: scale(1.1);
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

export const WrapperImg = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
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
`;
