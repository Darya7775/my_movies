import React, { memo, useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { fetchOneMovie, selectMovieRecommendById } from "../../../slices_redux/one_movie_slice";
import { addMovie, deleteMovie } from "../../../slices_redux/favorites_movies_slice";
import { addLocalStorageMovie, deleteLocalStorageMovie } from "../../../utils/local_storage";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import Spinner from "../../ui/spinner";
import Error from "../../ui/error";
import PageCardMovie from "../../blocks/card_movie_page";
import * as T from "../../../types";

const MoviePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [ prompt, setPrompt ] = useState(false);
  const { idmovie } = useParams() as { idmovie: string };

  const movieState = useAppSelector(state => state.oneMovie.movie);
  const recommendationsMovies = useAppSelector(state => state.oneMovie.ids);
  const error = useAppSelector(state => state.oneMovie.error);
  const status = useAppSelector(state => state.oneMovie.status);

  useEffect(() => {
    (async() => {
      await dispatch(fetchOneMovie(idmovie));
    })();
  }, [idmovie]);

  const callbacks = {
    //  добавить фильм в избранное
    onAddMovie: useCallback((movie: T.OneMovieMain | T.FavInMovOne) => {
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

  let content;
  if(status === "loading") {
    content = <Spinner text="Loading..." />;
  } else if(status === "succeeded") {
    content = <PageCardMovie
      movie={movieState}
      recommendationsMovieIds={recommendationsMovies}
      select={selectMovieRecommendById}
      onAdd={() => callbacks.onAddMovie(movieState)}
      onDelete={() => callbacks.onDelete(movieState.id)}
      markOpen={prompt}
      auth={auth.currentUser} />;
  } else if(status === "failed") {
    content = <Error>{`Check if VPN is enabled: "${error}"`}</Error>;
  }

  return(
    <main>
      {content}
    </main>
  );
};

export default memo(MoviePage);
