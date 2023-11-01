import styled from "styled-components";
import YouTube from "react-youtube";
import * as screen from "../../../styles/constants";

export const StyleYoutube = styled(YouTube)`
  display: flex;
  justify-content: center;

  iframe {
    width: 320px;
    height: 181px;

    @media (min-width: ${screen._375_PX}) {
      width: 375px;
      height: 211px;
    }

    @media (min-width: ${screen._425_PX}) {
      width: 425px;
      height: 239px;
    }

    @media (min-width: ${screen._480_PX}) {
      width: 480px;
      height: 270px;
    }

    @media (min-width: ${screen._540_PX}) {
      width: 540px;
      height: 303px;
    }

    @media (min-width: ${screen._640_PX}) {
      width: 640px;
      height: 360px;
    }

    @media (min-width: ${screen._768_PX}) {
      width: 768px;
      height: 432px;
    }

    @media (min-width: ${screen._1024_PX}) {
      width: 1024px;
      height: 576px;
    }

    @media (min-width: ${screen._1280_PX}) {
      width: 1280px;
      height: 720px;
    }

    @media (min-width: ${screen._1366_PX}) {
      width: 1366px;
      height: 768px;
    }

    @media (min-width: ${screen._1920_PX}) {
      width: 1920px;
      height: 1080px;
    }
  }
`;
