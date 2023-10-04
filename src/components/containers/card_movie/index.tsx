import React, { memo } from "react";
import useAppSelector from "../../../hooks/use-selector";
import { OneMovieMain } from "../../../slices_redux/types";
import noPoster from "../../../assets/no_poster.png";
import * as S from "./styles";

interface Props {
  movieId: number,
  // @todo сделать
  select: any
}

const CardMovie: React.FC<Props> = (props: Props) => {
  const movie = useAppSelector(state => props.select(state, props.movieId)) as OneMovieMain;

  return(
    <>
      {movie
        ? (<S.LinkMovieStyle to={`/movie/${props.movieId}`}>
            <S.WrapperImg>
              <S.ImgPoster src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : noPoster} alt="Poster" width={300} height={450} />
            </S.WrapperImg>
            <h2>{movie.title}</h2>
            <span>{movie.release_date?.split("-")[0]}</span>
            <S.ListGenres>{movie.genre_ids?.join(", ")}</S.ListGenres>
            {movie.vote_average !== 0 && <S.MovieRating>{movie.vote_average.toFixed(1)}</S.MovieRating>}
          </S.LinkMovieStyle>)
        : (<div>No movie</div>)
      }
    </>
  );
};

export default memo(CardMovie);
