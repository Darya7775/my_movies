import React, { memo } from "react";
import Wrapper from "../../ui/wrapper";
import * as S from "./styles";

interface Props {
  children: JSX.Element,
  onHandler: () => void,
  totalDocuments: number
}

const WrapperMiniReviews: React.FC<Props> = (props: Props) => {
  return(
    <div onClick={props.onHandler}>
      <Wrapper data-vertical="start">
        <h2>Reviews</h2>
        <S.SpanArrow>{props.totalDocuments}</S.SpanArrow>
      </Wrapper>
      {props.children}
    </div>
  );
};

export default memo(WrapperMiniReviews);
