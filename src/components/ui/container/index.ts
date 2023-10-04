import styled from "styled-components";
import * as screen from "../../../styles/constants";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.indentMobile};

  @media (min-width: ${screen._768_PX}) {
    padding: 0 ${(props) => props.theme.indentTablet};
  }

  @media (min-width: ${screen._1024_PX}) {
    padding: 0 ${(props) => props.theme.indentDesktop};
  }

  @media (min-width: ${screen._1920_PX}) {
    padding: 0 ${(props) => props.theme.indent};
  }
`;

export default Container;
