import React, { memo } from "react";
import useAppDispatch from "../../../hooks/use-dispatch";
import useInit from "../../../hooks/use-init";
import { fetchMovie, initParams, fetchSearchMovie } from "../../../slices_redux/movie_slice";
import store from "../../../store";
import ListMovies from "../../containers/list_movies";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  useInit(async () => {
    dispatch(initParams());
    const query = store.getState().movies.params.q;
    if(query !== "") {
      await dispatch(fetchSearchMovie(true));
    } else {
      await dispatch(fetchMovie(true));
    }
  }, [], true)

  return (
    <main>
      <ListMovies />
    </main>
  );
}

export default memo(Main);
