import React, { memo, useCallback, useState } from "react";
import type { RootState } from "../../../store";
import { auth } from "../../../firebase/firebase";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { addMovie, deleteMovie } from "../../../slices_redux/favorites_movies_slice";
import { addLocalStorageMovie, deleteLocalStorageMovie } from "../../../utils/local_storage";
import NoPoster from "../../blocks/img_no_poster";
import Heart from "../../blocks/heart";
import * as T from "../../../types";
import * as S from "./styles";
import Tooltip from "../../blocks/tooltip";

interface Props {
  movieId: number,
  select: (state: RootState, id: number) => T.OneMovieMain | undefined
}

const CardMovie: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const movieState = useAppSelector(state => props.select(state, props.movieId)) as T.OneMovieMain;
  const [ prompt, setPrompt ] = useState(false);

  const callbacks = {
    //  добавить фильм в избранное
    onAddMovie: useCallback((movie: T.OneMovieMain) => {
      dispatch(addMovie(movie));
      addLocalStorageMovie(movie.id, movie);
      setPrompt(true);
    }, [movieState.id]),
    // удалить фильм из избранного
    onDelete: useCallback((id: number) => {
      dispatch(deleteMovie(id));
      deleteLocalStorageMovie(id);
    }, [movieState.id])
  };

  return(
    <>
      {movieState
        ?(<S.WrapperMovieStyle>
          {auth.currentUser === null && <Tooltip markOpen={prompt}/>}
          <S.LinkImg to={`/movie/${props.movieId}`}>
            {movieState.poster_path !== null
              ? <S.ImgPoster src={`https://image.tmdb.org/t/p/w300/${movieState.poster_path}`} alt="Poster" width={300} height={450} />
              : <NoPoster width={300} height={450} card={true} />
            }
          </S.LinkImg>
          <S.LinkTitle to={`/movie/${props.movieId}`}>
            <h2>{movieState.title}</h2>
          </S.LinkTitle>
          <Heart
            isFav={movieState.isFav}
            onAdd={() => callbacks.onAddMovie(movieState)}
            onDelete={() => callbacks.onDelete(movieState.id)}>
          </Heart>
          <S.Year>{movieState.release_date?.split("-")[0]}</S.Year>
          <S.ListGenres>{movieState.genre_ids?.join(", ")}</S.ListGenres>
          {movieState.vote_average > 0 && <S.MovieRating>{movieState.vote_average.toFixed(1)}</S.MovieRating>}
        </S.WrapperMovieStyle>)
        : (<div>No movie</div>)
      }
    </>
  );
};

export default memo(CardMovie);
