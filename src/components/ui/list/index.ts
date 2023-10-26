import styled from "styled-components";

const List = styled.ul`
  padding: 0;
  margin: 16px 0;
  list-style: none;

  display: grid;
  gap: 5px;
  justify-items: center;

  &[data-nested="true"] {
    margin-left: 32px;
  }
`;

export default List;
