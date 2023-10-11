import React, { useEffect, useState } from "react";
import LinkStyle from "../../ui/link_router";
import ButtonCross from "../../ui/button_cross";
import * as S from "./styles";

interface Props {
  markOpen: boolean
}

const Tooltip: React.FC<Props> = (props: Props) => {
  const [ open, setOpen ] = useState(false);

  useEffect(() => setOpen(props.markOpen), [props.markOpen]);

  return(
    <S.TooltipStyles data-show={open ? "true" : "false"}>
      <LinkStyle to="/login">Log in</LinkStyle> or
      <LinkStyle to="/register">Register</LinkStyle> to view your favorite films
      <ButtonCross type="button" onClick={() => setOpen(false)} aria-label="Close tooltip"></ButtonCross>
    </S.TooltipStyles>
  );
};

export default Tooltip;
