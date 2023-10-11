import * as T from "../../slices_redux/types";
import createMovieFrom from "../create_from";

interface LocalStorage {
  [key: string]: object
};

export const addLocalStorageMovie = (idMovie: number, movie: T.OneMovieMain | T.FavInMovOne) => {
  if(!localStorage.getItem("favoritesMovies")) {
    const favMov = {} as LocalStorage;
    favMov[idMovie] = {...createMovieFrom(movie), isFav: true};
    localStorage.setItem("favoritesMovies", JSON.stringify(favMov));
  } else {
    const favMov = JSON.parse(localStorage.getItem("favoritesMovies") as string);
    favMov[idMovie] = {...createMovieFrom(movie), isFav: true};
    localStorage.setItem("favoritesMovies", JSON.stringify(favMov));
  }
};

export const deleteLocalStorageMovie = (idMovie: number) => {
  const favMov = JSON.parse(localStorage.getItem("favoritesMovies") as string);
  delete favMov[idMovie];
  localStorage.setItem("favoritesMovies", JSON.stringify(favMov));
};

export const deleteLocalStorageAllMovie = () => {
  localStorage.removeItem("favoritesMovies");
};
