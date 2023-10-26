import React, { memo } from "react";
import * as T from "../../../types";
import * as S from "./styles";
import Wrapper from "../../ui/wrapper";
import getDate from "../../../utils/date_conversion";

interface Props {
  review: T.Review | T.Children,
  children: JSX.Element
}

const OneReview: React.FC<Props> = (props: Props) => {
  return(
    <S.ReviewStyle>
      <Wrapper>
        <h4>{props.review.name}</h4>
        <span>{getDate(props.review.time)}</span>
      </Wrapper>
      <p>{props.review.comment}</p>
      {props.children}
    </S.ReviewStyle>
  );
};

export default memo(OneReview);
