import React, { memo, useCallback } from "react";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { addCurrentPage, fetchSearchMovie, fetchMovie, selectMovieById } from "../../../slices_redux/movie_slice";
import MoviesList from "../../blocks/list_card";
import Pagination from "../../blocks/pagination";
import Spinner from "../../ui/spinner";
import Error from "../../ui/error";
import store from "../../../store";

const ListMovies: React.FC = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(state => state.movies.status);
  const moviesIds = useAppSelector(state => state.movies.ids);
  const error = useAppSelector(state => state.movies.error);
  const count = useAppSelector(state => state.movies.count);
  // параметры
  const choosedCategory = useAppSelector(state => state.movies.choosedCategory);
  const currentPage = useAppSelector(state => state.movies.params.page);
  const queryState = useAppSelector(state => state.movies.params.q);
  const adult = useAppSelector(state => state.movies.params.include_adult);
  const lang = useAppSelector(state => state.movies.params.language);
  const year = useAppSelector(state => state.movies.params.primary_release_year);

  const callbacks = {
    // Пагинация
    onPaginate: useCallback(async(number: number) => {
      dispatch(addCurrentPage(number));
      const query = store().getState().movies.params.q;
      if(query) {
        await dispatch(fetchSearchMovie(false));
      } else {
        await dispatch(fetchMovie(false));
      }
    }, []),
    // генератор ссылки для пагинатора
    makePaginatorLink: useCallback((page: number) => {
      if(queryState) {
        // query=&include_adult=&language=&primary_release_year=&page=
        return `/search?${new URLSearchParams({ query: queryState, include_adult: adult, language: lang, primary_release_year: year, page: String(page) })}`;
      }
      // language=&page=
      return `/${choosedCategory}?${new URLSearchParams({ language: lang, page: String(page) })}`;
    }, [ queryState, adult, lang, year, choosedCategory ])
  };

  let content;
  if(status === "loading") {
    content = <Spinner text="Loading..." />;
  } else if(status === "succeeded") {
    content = <>
      <MoviesList moviesIds={moviesIds} select={selectMovieById} />
      <Pagination link={callbacks.makePaginatorLink} currentPage={Number(currentPage)} count={count} onhandler={callbacks.onPaginate} />
    </>;
  } else if(status === "failed") {
    content = <Error>{`Check if VPN is enabled: "${error}"`}</Error>;
  }

  return content;
};

export default memo(ListMovies);
