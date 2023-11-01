import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as T from "../types";

const initialStateLocal = () => {
  if(localStorage.getItem("favoritesMovies")) {
    const favMov: {[key: string]: T.OneMovieMain} = JSON.parse(localStorage.getItem("favoritesMovies") as string);
    return({
      arrayMovies: Object.values(favMov)
    });
  }
  return({
    arrayMovies: []
  });
};

const initialState: T.StateFavoritesMovies = initialStateLocal();

const favMovSlice = createSlice({
  name: "favMov",
  initialState,
  reducers: {
    // добавить фильм в избранное
    addMovie: (state, action: PayloadAction<T.OneMovieMain | T.FavInMovOne>) => {
      state.arrayMovies.push({...action.payload, isFav: true});
    },
    // удалить фильм из избранного
    deleteMovie: (state, action: PayloadAction<number>) => {
      state.arrayMovies = state.arrayMovies.filter(movie => movie.id !== action.payload);
    },
    // удалить все фильмы из избранного
    deleteAllMovies: (state) => {
      state.arrayMovies = [];
    }
  }
});

export const { addMovie, deleteMovie, deleteAllMovies } = favMovSlice.actions;

export default favMovSlice.reducer;
