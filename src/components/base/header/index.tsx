import React, { memo, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { fetchSearchMovie, setParams, addCurrentPage } from "../../../slices_redux/movie_slice";
import logo from "../../../assets/movies_logo.png";
import { languages, years, adult } from "../../../assets/data/filters";
import ListCategories from "../../containers/list_categories";
import Search from "../../blocks/search";
import * as S from "./styles";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams() as { id: string };

  const q = useAppSelector(state => state.movies.params.q);
  const language = useAppSelector(state => state.movies.params.language);
  const year = useAppSelector(state => state.movies.params.primary_release_year);
  const markAdult = useAppSelector(state => state.movies.params.include_adult);

  const callbacks = {
    // отправка запроса на искомые фильмы
    onSubmit: useCallback(async(e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(addCurrentPage(1));
      await dispatch(fetchSearchMovie(false));
    }, []),
    // Поиск
    onSearch: useCallback((q: string) => {
      dispatch(setParams({ param: "q", value: q }));
    }, [q]),
    // Смена языка
    onLanguage: useCallback((language: string) => {
      dispatch(setParams({ param: "language", value: language }));
    }, [language]),
    // Смена года выпуска
    onYear: useCallback((year: string) => {
      dispatch(setParams({ param: "primary_release_year", value: year }));
    }, [year]),
    // Adult or child
    onAdult: useCallback((adult: string) => {
      dispatch(setParams({ param: "include_adult", value: adult }));
    }, [markAdult]),
    // page change
    onPage: useCallback(() => {
      dispatch(addCurrentPage(1));
    }, [])
  };

  return (
    <S.Header>
      <S.HeaderContainer>
        <S.Logo to="/" onClick={callbacks.onPage}>
          <img src={logo} alt="Logo" width={40} height={40}/>
          <span>My Movie</span>
        </S.Logo>
        {location.pathname === `/${id}` // если главная страница, то показывать поиск
          ? (
            <>
            <Search onSubmit={callbacks.onSubmit} value={q} onChangeValue={callbacks.onSearch}
              options={{ l: languages, y: years, a: adult }}
              values={{ l: language, y: year, a: markAdult }}
              handlers={{ onChangeLan: callbacks.onLanguage, onChangeYear: callbacks.onYear, onChangeAdult: callbacks.onAdult }}
              nameSel={{ l: "languages", y: "years", a: "adult or child" }}/>
            <ListCategories />
            </>)
          : null}
      </S.HeaderContainer>
    </S.Header>
  );
};

export default memo(Header);
