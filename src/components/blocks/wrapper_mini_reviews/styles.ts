import styled from "styled-components";
import arrow from "../../../assets/slider_arrow_prev.svg";

export const SpanArrow = styled.span`
  &::after {
    content: "";
    display: inline-block;
    width: 15px;
    height: 15px;

    transform: rotate(180deg);
    background: center / contain no-repeat url(${arrow});

    margin-left: 10px;

    cursor: pointer;
  }
`;
