import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import userReducer from "./slices_redux/user_slice";
import moviesReducer from "./slices_redux/movie_slice";
import oneMovieReducer from "./slices_redux/one_movie_slice";
import favoritesMoviesReducer from "./slices_redux/favorites_movies_slice";

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  oneMovie: oneMovieReducer,
  favoritesMovies: favoritesMoviesReducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]

export default setupStore;

export const state = setupStore().getState();
