import React, { memo } from "react";
import CardMovie from "../../containers/card_movie";
import * as S from "./styles";

interface Props {
  moviesIds: number[],
  // @todo сделать
  select: any
}

const List: React.FC<Props>= (props: Props) => {

  return(
    <S.MoviesSectionStyle>
      <S.MoviesContainer>
      <S.MoviesListStyle>
        {props.moviesIds.map((movieId, index) => (
          <S.MovieItemStyle key={index}>
            <CardMovie movieId={movieId} select={props.select} />
          </S.MovieItemStyle>
        ))}
        </S.MoviesListStyle>
      </S.MoviesContainer>
    </S.MoviesSectionStyle>
  );
}

export default memo(List);
