import React, { useState, useCallback, memo } from "react";
import useMactchMedia from "../../../hooks/use-match-media";
import useAppSelector from "../../../hooks/use-selector";
import useAppDispatch from "../../../hooks/use-dispatch";
import { onChangeCategory, fetchMovie, addCurrentPage, clearQuery } from "../../../slices_redux/movie_slice";
import { categories } from "../../../assets/data/filters";
import Button from "../../ui/button";
import * as S from "./styles";

const ListCategories: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isMobile } = useMactchMedia() as { isMobile: boolean };
  const [ open, setOpen ] = useState(false);
  // текущая категория
  const isActive = useAppSelector(state => state.movies.choosedCategory);

  const callbacks = {
    // при изменении категории
    onSubmit: useCallback(async (category: string) => {
      dispatch(clearQuery());
      dispatch(addCurrentPage(1));
      dispatch(onChangeCategory(category));
      await dispatch(fetchMovie(false));
    }, []),
    // закрытие/открытие списка категорий
    onOpen: () => setOpen(!open),
  };

  const content = categories.map((category, index) => (
                    <li key={index}>
                      <S.ButtonCategoriesList disabled={isActive === category.u ? true : false} type="button" onClick={() => {
                            callbacks.onOpen();
                            callbacks.onSubmit(category.u);}}>
                        {category.title}
                      </S.ButtonCategoriesList>
                    </li>
                  ));

  return(
    <>
      {isMobile
        ? (open
            ? (<S.Wrapper>
                <Button type="button" aria-label="close list of categories" onClick={callbacks.onOpen}>
                  Categories
                </Button>
                <S.ListCategories>
                  {content}
                </S.ListCategories>
              </S.Wrapper>)
            : (<Button type="button" aria-label="open list of categories" onClick={callbacks.onOpen}>
                Categories
              </Button>)
          )
        : (<S.ListCategories>{content}</S.ListCategories>)
      }
    </>
  );
};

export default memo(ListCategories);
