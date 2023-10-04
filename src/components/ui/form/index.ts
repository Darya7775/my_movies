import styled from "styled-components";
import * as screen from "../../../styles/constants";

const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;

  margin: 20px 0;

  @media (min-width: ${screen._768_PX}) {
    width: 47%;
    gap: 15px;
  }

  @media (min-width: ${screen._1024_PX}) {
    width: 35vw;
    margin: 20px auto 0;
    padding: 10px 35px 10px 10px;

    gap: 20px;

    border-radius: 10px;
    box-shadow: 0 0 15px 0 ${props => props.theme.colorBlue};
  }

  @media (min-width: ${screen._1600_PX}) {
    padding: 20px 45px 20px 20px;
  }
`;

export default Form;
