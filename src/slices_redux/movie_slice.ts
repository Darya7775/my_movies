import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import * as T from "./types";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import { conversionMovie } from "../utils/movie_conversion";
import options from "./headers_fetch";

const initialState: T.StateMovies = {
  status: "idle",
  entities: {},
  ids: [],
  count: 1,
  choosedCategory: "now_playing",
  params: {
    q: "",
    include_adult: "false",
    language: "en-US",
    primary_release_year: "2023",
    page: 1
  },
  error: ""
};

const moviesAdapter = createEntityAdapter<T.OneMovieMain>();

moviesAdapter.getInitialState(initialState);

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
}>();

/**
 * Получение фильмов по категории
 * @param choosedCategory выбранная категория
 * @param curPage текущая страница
 */
export const fetchMovie = createAppAsyncThunk("movie/categories", async (replaceHistory: boolean, {getState}): Promise<T.AllMovies> => {
  // Получение параметров из store
  const param = getState().movies.params;
  // Получение текущей категории
  const choosedCategory = getState().movies.choosedCategory;
  // Cбор search params
  let urlSearch = `language=${param.language}&page=${param.page}`;
  // Сохранить параметры в адрес страницы
  const url = choosedCategory + (urlSearch ? `?${urlSearch}`: '') + window.location.hash;
  if(replaceHistory) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${choosedCategory}?${urlSearch}`, options);
    const data: T.AllMovies = await response.json();
    // получение жанров
    const responseGenres = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const dataGenres: T.Genres = await responseGenres.json();
    data.results = conversionMovie(data.results, dataGenres);
    return data;
  } catch (error: any) {
    throw(error.message);
  }
});

/**
 * Запрос на фильмы по поиску
 * @param replaceHistory указатель перезаписи в history stack
 */
export const fetchSearchMovie = createAppAsyncThunk("movie/search", async(replaceHistory: boolean, {getState}): Promise<T.AllMovies> => {
  // Получение параметров из store
  const param = getState().movies.params;
  // Cбор search params
  let urlSearch = `query=${param.q}&include_adult=${param.include_adult}&language=${param.language}&primary_release_year=${param.primary_release_year}&page=${param.page}`;
  // Сохранить параметры в адрес страницы
  const url = "/search" + (urlSearch ? `?${urlSearch}`: '') + window.location.hash;
  if(replaceHistory) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?${urlSearch}`, options);
    const data: T.AllMovies = await response.json();
    // получение жанров
    const responseGenres = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const dataGenres: T.Genres = await responseGenres.json();
    data.results = conversionMovie(data.results, dataGenres);
    return data;
  } catch (error: any) {
    throw(error.message);
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearQuery: (state) => {
      state.params.q = "";
    },
    onChangeCategory: (state, action: PayloadAction<string>) => {
      state.choosedCategory = action.payload;
    },
    addCurrentPage: (state, action: PayloadAction<number>) => {
      state.params.page = action.payload;
    },
    // Инициализация параметров, восстановление из адреса
    initParams: (state) => {
      // @todo сделать валидацию параметров
      const urlParams = new URLSearchParams(window.location.search);
      state.choosedCategory = window.location.pathname.split("/")[1] === ":id" ? "now_playing" : window.location.pathname.split("/")[1];
      if(urlParams.has("query")) state.params.q = urlParams.get("query") || "";
      if(urlParams.has("include_adult")) state.params.include_adult = urlParams.get("include_adult") || "false";
      if(urlParams.has("language")) state.params.language = urlParams.get("language") || "en-US";
      if(urlParams.has("primary_release_year")) state.params.primary_release_year= urlParams.get("primary_release_year") || "2023";
      if(urlParams.has("page")) state.params.page = Number(urlParams.get("page")) || 1;
    },
    // Установка параметров
    setParams: (state, action: PayloadAction<{ param: string, value: string }>) => {
      switch (action.payload.param) {
        case "q":
          state.params.q = action.payload.value;
          break;
        case "language":
          state.params.language = action.payload.value;
          break;
        case "primary_release_year":
          state.params.primary_release_year = action.payload.value;
          break;
        case "include_adult":
          state.params.include_adult = action.payload.value;
          break;

        default:
          break;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovie.fulfilled, (state, action: PayloadAction<T.AllMovies>) => {
        state.status = "succeeded";
        state.params.page = action.payload.page;
        state.count = action.payload.total_pages;
        moviesAdapter.removeMany(state, state.ids);
        moviesAdapter.upsertMany(state, action.payload.results);
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSearchMovie.pending, (state) => {
        state.status = "loading";
        state.choosedCategory = "";
      })
      .addCase(fetchSearchMovie.fulfilled, (state, action: PayloadAction<T.AllMovies>) => {
        state.status = "succeeded";
        state.params.page = action.payload.page;
        state.count = action.payload.total_pages;
        moviesAdapter.removeMany(state, state.ids);
        moviesAdapter.upsertMany(state, action.payload.results);
      })
      .addCase(fetchSearchMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
});

export default moviesSlice.reducer;

export const { onChangeCategory, addCurrentPage, setParams, initParams, clearQuery } = moviesSlice.actions;

export const {
  selectAll: selectAllMovies,
  selectById: selectMovieById,
  selectIds: selectMovieIds
} = moviesAdapter.getSelectors<RootState>(state => state.movies);
