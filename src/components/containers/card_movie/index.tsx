import React, { memo, useCallback, useState } from "react";
import type { RootState } from "../../../store";
import { auth } from "../../../firebase/firebase";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { OneMovieMain } from "../../../slices_redux/types";
import { addMovie, deleteMovie } from "../../../slices_redux/favorites_movies_slice";
import { addLocalStorageMovie, deleteLocalStorageMovie } from "../../../utils/local_storage";
import noPoster from "../../../assets/no_poster.png";
import Heart from "../../blocks/heart";
import * as T from "../../../slices_redux/types";
import * as S from "./styles";
import Tooltip from "../../blocks/tooltip";

interface Props {
  movieId: number,
  select: (state: RootState, id: number) => T.OneMovieMain | undefined
}

const CardMovie: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const movie = useAppSelector(state => props.select(state, props.movieId)) as OneMovieMain;
  const [ prompt, setPrompt ] = useState(false);

  const callbacks = {
    //  добавить фильм в избранное
    onAddMovie: useCallback((movie: T.OneMovieMain) => {
      dispatch(addMovie(movie));
      addLocalStorageMovie(movie.id, movie);
      setPrompt(true);
    }, [movie.id]),
    // удалить фильм из избранного
    onDelete: useCallback((id: number) => {
      dispatch(deleteMovie(id));
      deleteLocalStorageMovie(id);
    }, [movie.id])
  }

  return(
    <>
      {movie
        ? (<S.WrapperMovieStyle>
            {auth.currentUser === null &&  <Tooltip markOpen={prompt}/>}
            <S.LinkImg to={`/movie/${props.movieId}`}>
              <S.ImgPoster src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : noPoster} alt="Poster" width={300} height={450} />
            </S.LinkImg>
            <S.LinkTitle to={`/movie/${props.movieId}`}>
              <h2>{movie.title}</h2>
            </S.LinkTitle>
            <Heart
              isFav={movie.isFav}
              onAdd={() => callbacks.onAddMovie(movie)}
              onDelete={() => callbacks.onDelete(movie.id)}>
            </Heart>
            <S.Year>{movie.release_date?.split("-")[0]}</S.Year>
            <S.ListGenres>{movie.genre_ids?.join(", ")}</S.ListGenres>
            {movie.vote_average !== 0 && <S.MovieRating>{movie.vote_average.toFixed(1)}</S.MovieRating>}
          </S.WrapperMovieStyle>)
        : (<div>No movie</div>)
      }
    </>
  );
};

export default memo(CardMovie);
