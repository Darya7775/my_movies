import styled from "styled-components";
import * as screen from "../../../styles/constants";

export const WrapperSelect = styled.div`
  position: relative;
  height: 44px;
  width: 100px;

  @media (min-width: ${screen._1024_PX}) {
    width: 110px;
  }

  @media (min-width: ${screen._1536_PX}) {
    width: 125px;
  }
`;

export const SelectStyle = styled.ul`
  width: 100%;
  min-height: 25px;
  height: fit-content;
  max-height: 100px;

  margin: 0;
  padding: 10px;
  list-style: none;

  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: rgb(213, 209, 234) 0 6px 18px 0;

  overflow-y: scroll;

  scrollbar-color: ${props => props.theme.colorScrollbarThumb} ${props => props.theme.colorScrollbarTrack};
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: ${props => props.theme.colorScrollbarTrack};
    border-radius: 10px;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb:vertical {
    height: 15px;
    background-color: ${props => props.theme.colorScrollbarThumb};
    border-radius: 10px;
  }

  @media (min-width: ${screen._768_PX}) {
    max-height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    box-shadow: 0 0 0 1px ${props => props.theme.colorBlue};
  }

  @media (min-width: ${screen._1280_PX}) {
    flex-direction: row;
  }

  @media (min-width: ${screen._1366_PX}) {
    max-height: 130px;
  }
`;

export const SelectItem = styled.li`
  label {
    display: flex;
    align-items: center;
    gap: 10px;

    position: relative;

    cursor: pointer;

    @media (hover:hover) {
      &:hover {
        text-decoration: #000000 solid underline;
      }
    }
  }

  input[type="radio"] {
    position: absolute;

    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;

    white-space: nowrap;

    border: 0;

    clip: rect(0 0 0 0);
    clip-path: inset(100%);
  }
`;
