import React, { forwardRef, memo, useEffect } from "react";
import * as S from "./styles";

interface Props {
  children: JSX.Element,
  state: boolean,
  ref?: React.Ref<HTMLDivElement> | null,
}

const Modal = forwardRef<HTMLDivElement, Props>((props, ref) => {

  useEffect(() => {
    if (props.state) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
 }, [props.state]);

  return (
    <S.Ovarlay ref={ref}>
      <S.Modal>{props.children}</S.Modal>
    </S.Ovarlay>
  );
});

export default memo(Modal);
