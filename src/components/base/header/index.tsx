import React, { memo, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { fetchSearchMovie, setParams, addCurrentPage } from "../../../slices_redux/movie_slice";
import logoPng from "../../../assets/logo/movies_logo.png";
import logoWebp from "../../../assets/logo/movies_logo.webp";
import logoAvif from "../../../assets/logo/movies_logo.avif";
import { languages, years, adultSalect } from "../../../assets/data/filters";
import ListCategories from "../../containers/list_categories";
import Search from "../../blocks/search";
import * as S from "./styles";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams() as { id: string };

  const query = useAppSelector(state => state.movies.params.q);
  const languageState = useAppSelector(state => state.movies.params.language);
  const yearState = useAppSelector(state => state.movies.params.primary_release_year);
  const markAdultState = useAppSelector(state => state.movies.params.include_adult);

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
    }, [query]),
    // Смена языка
    onLanguage: useCallback((language: string) => {
      dispatch(setParams({ param: "language", value: language }));
    }, [languageState]),
    // Смена года выпуска
    onYear: useCallback((year: string) => {
      dispatch(setParams({ param: "primary_release_year", value: year }));
    }, [yearState]),
    // Adult or child
    onAdult: useCallback((adult: string) => {
      dispatch(setParams({ param: "include_adult", value: adult }));
    }, [markAdultState]),
    // page change
    onPage: useCallback(() => {
      dispatch(addCurrentPage(1));
    }, [])
  };

  return (
    <S.Header>
      <S.HeaderContainer>
        <S.Logo to="/" onClick={callbacks.onPage}>
          <picture>
            <source type="image/avif" srcSet={logoAvif} />
            <source type="image/webp" srcSet={logoWebp} />
            <img src={logoPng} alt="Logo" width={40} height={40}/>
          </picture>
          <span>My Movie</span>
        </S.Logo>
        {location.pathname === `/${id}` // если главная страница, то показывать поиск
          ? (
            <>
              <Search onSubmit={callbacks.onSubmit} value={query} onChangeValue={callbacks.onSearch}
                options={{ l: languages, y: years, a: adultSalect }}
                values={{ l: languageState, y: yearState, a: markAdultState }}
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
