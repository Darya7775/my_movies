import React, { forwardRef, memo } from "react";
import Wrapper from "../../ui/wrapper";
import ButtonCross from "../../ui/button_cross";
import * as S from "./styles";

interface Props {
  children: JSX.Element,
  state: boolean,
  ref?: React.Ref<HTMLDivElement> | null,
  title: string,
  text?: number | string,
  onHandler?: () => void
}

const Modal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <S.Ovarlay data-show={props.state} ref={ref}>
      <S.Modal>
        <Wrapper>
          <Wrapper>
            <h2>{props.title}</h2>
            <span>{props.text}</span>
          </Wrapper>
          <ButtonCross onClick={props.onHandler} />
        </Wrapper>
        {props.children}
      </S.Modal>
    </S.Ovarlay>
  );
});

Modal.displayName = "Modal";

export default memo(Modal);
