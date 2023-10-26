import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  &[data-vertical="start"] {
    justify-content: flex-start;
  }
`;

export default Wrapper;
