import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import ButtonCross from "../../ui/button_cross";
import Button from "../../ui/button";
import * as screen from "../../../styles/constants";

const buttonStyles = css`
  width: 40px;
  height: 40px;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;

  background-color: ${props => props.theme.colorGrey};

  width: 100%;
  height: 100vh;

  cursor: pointer;
`;

export const StyleNavigationActive = styled.nav`
  width: 70%;
  height: 100vh;
  background-color: ${props => props.theme.colorWhite};
  padding: 20px;

  position: absolute;
  top: 0;
  right: 0;
  z-index: 7;

  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 16px;
`;

export const ButtonAvatar = styled.button`
  ${buttonStyles};
  padding: 5px 7px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.theme.colorBlue};

  color: ${props => props.theme.colorWhite};
  font-weight: 600;
  font-size: 1.5em;

  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.colorActiveLink};
    }
  }
`;

export const Lettera = styled.span`
  display: block;
  height: 40px;
`;

export const ButtonClose = styled(ButtonCross)`
  ${buttonStyles};
`;

export const ListUser = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: ${screen._768_PX}) {
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }

  @media (min-width: ${screen._1536_PX}) {
    gap: 20px;
  }

  @media (min-width: ${screen._1920_PX}) {
    gap: 25px;
  }
`;

export const ListUserLink = styled(Link)`
  display: block;
  padding: 5px 0;

  @media (hover:hover) {
    &:hover {
      text-shadow: 0 0 5px ${props => props.theme.colorBlue};
    }
  }
`;

export const ButtonSingOut = styled(Button)`
  width: 100%;
  padding: 5px;
`;
