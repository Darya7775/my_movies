import React, { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOneMovie, selectMovieRecommendById } from "../../../slices_redux/one_movie_slice";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import Spinner from "../../ui/spinner";
import Error from "../../ui/error";
import PageCardMovie from "../../blocks/card_movie_page";

const MoviePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { idmovie } = useParams() as { idmovie: string };

  const movie = useAppSelector(state => state.oneMovie.movie);
  const recommendationsMovies = useAppSelector(state => state.oneMovie.ids);
  const error = useAppSelector(state => state.oneMovie.error);
  const status = useAppSelector(state => state.oneMovie.status);

  useEffect(() => {
    (async() => {
      await dispatch(fetchOneMovie(idmovie));
    })();
  }, [idmovie]);

  let content;
  if(status === "loading") {
    content = <Spinner text="Loading..." />;
  } else if(status === "succeeded") {
    content = <PageCardMovie movie={movie} recommendationsMovieIds={recommendationsMovies} select={selectMovieRecommendById} />;
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
