import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  body,
  html {
    margin: 0;
    height: 100%;
  }

  body {
    position: relative;
    min-height: 100%;
    font-family: "Relaway", "Arial", sans-serif;
    font-size: 16px;
    line-height: 150%;
    font-weight: 400;
    color: ${(props) => props.theme.colorFont};
    scrollbar-color: ${props => props.theme.colorScrollbarThumb} ${props => props.theme.colorScrollbarTrack};
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 10px;
      height: 5px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: ${props => props.theme.colorScrollbarTrack};
      border-radius: 10px;
      width: 10px;
    }

    &::-webkit-scrollbar-thumb:vertical {
      height: 30px;
      background-color: ${props => props.theme.colorScrollbarThumb};
      border-radius: 10px;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    font-weight: 400;
    color: ${props => props.theme.colorFont};
    text-decoration: none;
  }

  img,
  video {
    display: block;
    max-width: 100%;
  }

  #root {
    position: relative;

    display: flex;
    flex-direction: column;
    min-height: 100vh;

    header,
    footer {
      flex-shrink: 0;
    }

    main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
  }
  // title for mobile
  @media (pointer: coarse), (hover: none) {
    [title] {
      position: relative;
      display: inline-flex;
      justify-content: center;
    }

    [title]:hover::after {
      content: attr(title);
      position: absolute;
      z-index: 3;
      top: 90%;
      color: #000;
      background-color: #fff;
      border: 1px solid;
      width: max-content;
      padding: 3px;
      font-size: 14px;
    }

  }
`;
