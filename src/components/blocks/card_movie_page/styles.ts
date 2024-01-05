import styled, { css } from "styled-components";
import Container from "../../ui/container";
import * as screen from "../../../styles/constants";
import { size } from "../../../styles/mixins";

const point = css`
  position: relative;

  &:after {
    content: "";

    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 5px;
    height: 5px;
    background-color: #000000;
    border-radius: 50%;
    margin: 0 10px;

    text-align: center;
    vertical-align: super;
  }
`;

const limitRows = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  text-align: center;
`;

const listCss = css`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  justify-content: center;
`;

//  стили по тегам
export const PageMovieSection = styled.section`
  ${size};
  width: 100%;
  margin: 20px 0;

  display: flex;
  flex-direction: column;
  gap: 20px;

  position: relative;

  h3 {
    margin: 0;

    @media (min-width: ${screen._1024_PX}) {
      font-size: 1.3em;
    }

    @media (min-width: ${screen._1920_PX}) {
      font-size: 1.7em;

      margin: 0 0 20px;
    }
  }


  @media (min-width: ${screen._1024_PX}) {
    gap: 40px;
  }

  @media (min-width: ${screen._1440_PX}) {
    gap: 60px;
    margin: 40px 0;
  }

  @media (min-width: ${screen._1920_PX}) {
    margin: 60px 0;
  }
`;

export const ContainerPageMovie = styled(Container)`
  position: relative;

  display: grid;
  gap: 5px;

  @media (min-width: ${screen._768_PX}) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

export const WrapperMovie = styled.div`
  h2 {
    margin: 0;
    text-align: center;

    @media (min-width: ${screen._1024_PX}) {
      font-size: 2.5em;
      line-height: 1em;
    }
  }

  p {
    margin: 0;
  }

  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (min-width: ${screen._768_PX}) {
    gap: 15px;
  }
`;

export const WrapperYear = styled.div`
  text-align: center;
  gap: 10px;
`;

export const Year = styled.span`
  ${point};
`;

export const List = styled.ul`
  ${listCss};
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ImgFlag = styled.img`
  @media(min-width: ${screen._540_PX}) {
    height: 50px;
    width: 50px;
  }
`;

export const ImgContProd = styled.img`
  object-fit: contain;

  @media(min-width: ${screen._480_PX}) {
    width: 60px;
  }

  @media(min-width: ${screen._640_PX}) {
    width: 70px;
    height: 50px;
  }
`;

export const NoComProd = styled.span`
  ${limitRows};
  -webkit-line-clamp: 1;

  width: 50px;
  padding: 5px;
  background-color: #9d999f;
  border-radius: 5px;

  font-size: 14px;
  color: ${props => props.theme.colorWhite};

  user-select: none;

  @media(min-width: ${screen._480_PX}){
    width: 60px;
  }
`;

export const ListGenres = styled.ul`
  ${listCss};

  flex-wrap: wrap;
`;

export const ItemGenre = styled.li`
  display: flex;
  align-items: center;

  ${point};

  &:last-child::after {
    display: none;
  }
`;

export const ContainerCast = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: ${screen._1024_PX}) {
    gap: 25px;
  }
`;

export const TemplateCast = styled.div`
  display: grid;
  gap: 5px;

  width: fit-content;
  min-height: 237px;

  box-shadow: 0 0 7px 0px ${props => props.theme.colorBlue};

  h4 {
    margin: 0;
    padding: 0 5px;
    height: 50px;
    ${limitRows};
    -webkit-line-clamp: 2;

    @media (min-width: ${screen._1024_PX}) {
      height: 50px;
    }
  }

  p {
    margin: 0;
    padding: 0 5px 5px;
    max-height: 24px;

    ${limitRows};
    -webkit-line-clamp: 1;

    @media (min-width: ${screen._1024_PX}) {
      max-height: 30px;
    }

    @media (min-width: ${screen._1366_PX}) {
      max-height: 28px;
    }
  }

  @media (min-width: ${screen._768_PX}) {
    min-height: 240px;
  }
`;

export const ImgCast = styled.img`
  min-width: 98px;
  width: 100%;
  object-fit: contain;
  height: auto;
`;

export const ImgMovie = styled.img`
  width: 100%;
  object-fit: contain;
  float: left;
`;
