import React, { memo } from "react";
import * as S from "./styles";

interface Props {
  genre_ids: string[],
}

const ListGenres: React.FC<Props> = (props: Props) => {
  console.log(props.genre_ids)
  return(
    <S.GenresList>
      {props.genre_ids.map((genre, index) => (
        <S.GenreItem key={index}>
          {genre},
        </S.GenreItem>
      ))}
    </S.GenresList>
  );
};

export default memo(ListGenres);
