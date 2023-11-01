import styled from "styled-components";

const Section = styled.section`
  width: 80%;
  max-height: 500px;
  overflow: auto;

  padding: 0 10px;

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
`;

export default Section;
