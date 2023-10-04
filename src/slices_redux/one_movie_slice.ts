import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import type { EntityAdapter } from '@reduxjs/toolkit'
import options from "./headers_fetch";
import type { RootState } from "../store";
import conversionMovie from "../utils/movie_conversion";
import * as T from "./types";

export const fetchOneMovie = createAsyncThunk("oneMovie/fetch",async (idMovie: string): Promise<T.OneMoviePage> => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}?language=en-US&append_to_response=videos,credits,recommendations`, options);
    const data: T.OneMoviePage = await response.json();
    // получение жанров
    const responseGenres = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const dataGenres: T.Genres = await responseGenres.json();
    data.credits.cast = data.credits.cast.slice(0, 20);
    data.credits.crew = data.credits.crew.slice(0, 20);
    data.recommendations.results = conversionMovie(data.recommendations.results, dataGenres);
    return data;
  } catch (error: any) {
    throw error.message;
  }
});

const initialState: T.StateOneMoviePage = {
  status: "idle",
  error: "",
  ids: [],
  entities: {},
  movie: {
    id: 0,
    adult: false,
    backdrop_path: "",
    genres: [],
    overview: "",
    poster_path: "",
    production_companies: [],
    production_countries: [],
    vote_average: 0,
    title: "",
    release_date: "",
    runtime: 0,
    videos: {
      results: []
    },
    credits: {
      cast: [],
      crew: []
    },
    recommendations: {
      results: []
    }
  }
};

const oneMovieRecommendAdapter = createEntityAdapter();
oneMovieRecommendAdapter.getInitialState(initialState);

const oneMovieSlice = createSlice({
  name: "oneMovie",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOneMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOneMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
        oneMovieRecommendAdapter.removeMany(state, state.ids);
        oneMovieRecommendAdapter.upsertMany(state, action.payload.recommendations.results);
      })
      .addCase(fetchOneMovie.rejected,(state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default oneMovieSlice.reducer;

export const {
  selectAll: selectAllRecommendsMovies,
  selectById: selectMovieRecommendById,
  selectIds: selectMovieRecommendsIds
} = oneMovieRecommendAdapter.getSelectors<RootState>(state => state.oneMovie);
