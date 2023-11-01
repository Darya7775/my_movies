import React, { memo } from "react";
import noPoster from "../../../assets/no_poster.png";
import Heart from "../../blocks/heart";
import * as T from "../../../types";
import * as S from "./styles";

interface Props {
  movie: T.FavInMovOne | T.OneMovieMain,
  onDelete: (id: number) => void
}

const Card: React.FC<Props> = (props: Props) => {

  return(
    <S.WrapperMovieStyle>
      <S.LinkImg to={`/movie/${props.movie.id}`}>
        <S.ImgPoster src={props.movie.poster_path !== null ? `https://image.tmdb.org/t/p/w300/${props.movie.poster_path}` : noPoster} alt="Poster" width={300} height={450} />
      </S.LinkImg>
      <S.LinkTitle to={`/movie/${props.movie.id}`}>
        <h2>{props.movie.title}</h2>
      </S.LinkTitle>
      <Heart
        isFav={props.movie.isFav}
        onDelete={() => props.onDelete(props.movie.id)}>
      </Heart>
      <S.Year>{props.movie.release_date?.split("-")[0]}</S.Year>
      {("genre_ids" in props.movie && <S.ListGenres>{props.movie.genre_ids?.join(", ")}</S.ListGenres>)
        || ("genres" in props.movie && <S.ListGenres>{props.movie.genres?.reduce((acc, item) => (acc.push(item.name), acc), [] as string[]).join(", ")}</S.ListGenres>)}
      {props.movie.vote_average !== 0 && <S.MovieRating>{props.movie.vote_average.toFixed(1)}</S.MovieRating>}
    </S.WrapperMovieStyle>
  );
};

export default memo(Card);
