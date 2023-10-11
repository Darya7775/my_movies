import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices_redux/user_slice";
import moviesReducer from "./slices_redux/movie_slice";
import oneMovieReducer from "./slices_redux/one_movie_slice";
import favoritesMoviesReducer from "./slices_redux/favorites_movies_slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    oneMovie: oneMovieReducer,
    favoritesMovies: favoritesMoviesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const state = store.getState();
