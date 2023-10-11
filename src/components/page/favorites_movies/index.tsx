import React, { memo, useCallback } from "react";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { deleteMovie, deleteAllMovies } from "../../../slices_redux/favorites_movies_slice";
import { deleteLocalStorageMovie, deleteLocalStorageAllMovie } from "../../../utils/local_storage";
import Card from "../../blocks/card";
import Button from "../../ui/button";
import Container from "../../ui/container";
import List from "../../ui/list";

const FavoritesMovies: React.FC = () => {
  const dispatch = useAppDispatch();
  const favMovies = useAppSelector(state => state.favoritesMovies.arrayMovies);

  const callbacks = {
    // удалить фильм из избранного
    onDeleteOneMovie: (id: number) => {
      dispatch(deleteMovie(id));
      deleteLocalStorageMovie(id);
    },
    // удалить все фильмы
    onDeleteAllMovies: useCallback(() => {
      dispatch(deleteAllMovies());
      deleteLocalStorageAllMovie();
    },[])
  };

  return(
    <main>
      <Container>
        <div>Total: {favMovies.length}</div>
        <List>
          {favMovies?.map(movie => (
            <li key={movie.id}>
              <Card movie={movie} onDelete={callbacks.onDeleteOneMovie} />
            </li>
          ))}
        </List>
        <Button type="button" onClick={callbacks.onDeleteAllMovies}>dellet</Button>
      </Container>
    </main>
  );
}

export default memo(FavoritesMovies);
