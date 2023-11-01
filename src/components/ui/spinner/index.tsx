import React from "react";
import * as S from "./style";

interface Props {
  text: string,
  size?: string
}

const Spinner: React.FC<Props> = ({ text = "", size = "5em" }: Props) => {
  const header = text ? <h4>{text}</h4> : null;
  return (
    <S.SpinnerStyle>
      {header}
      <S.SpinnerLoader style={{ height: size, width: size }} />
    </S.SpinnerStyle>
  );
};

export default Spinner;
