import React, { memo } from "react";
import type { RootState } from "../../../store";
import CardMovie from "../../containers/card_movie";
import * as T from "../../../types";
import * as S from "./styles";

interface Props {
  moviesIds: number[],
  select: (state: RootState, id: number) => T.OneMovieMain | undefined
}

const List: React.FC<Props>= (props: Props) => {

  return(
    <S.MoviesSectionStyle>
      <S.MoviesContainer>
        <S.MoviesListStyle>
          {props.moviesIds.map(movieId => (
            <S.MovieItemStyle key={movieId}>
              <CardMovie movieId={movieId} select={props.select} />
            </S.MovieItemStyle>
          ))}
        </S.MoviesListStyle>
      </S.MoviesContainer>
    </S.MoviesSectionStyle>
  );
}

export default memo(List);
