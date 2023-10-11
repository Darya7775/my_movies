import styled from "styled-components";
import Container from "../../ui/container";
import * as mix from "../../../styles/mixins";

export const Wrapper = styled(Container)`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

  ${mix.size};
`;
