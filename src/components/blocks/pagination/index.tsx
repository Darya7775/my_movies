import React, { memo } from "react";
import * as S from "./styles";

interface Props {
  count: number,
  onhandler: (number: number) => void,
  currentPage: number,
  link: (number: number) => string
}

const Pagination: React.FC<Props> = (props: Props) => {
  const NUMBERS_OF_PAGES = 500;
  const NUMBERS_OF_VISIBLE_PAGES = 2;

  // ограничение на количество страниц <= 500
  const count = props.count > NUMBERS_OF_PAGES ? NUMBERS_OF_PAGES : props.count;

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(props.currentPage - 1, 1);
  const right = Math.min(left + 1 * NUMBERS_OF_VISIBLE_PAGES, count);
  // Корректировка когда страница в конце
  left = Math.max(right - 1 * NUMBERS_OF_VISIBLE_PAGES, 1);

  // Массив номеров, чтобы удобней рендерить
  const items = [];
  // Первая страница всегда нужна
  if (left > 1) items.push(1);
  // Пропуск
  if (left > NUMBERS_OF_VISIBLE_PAGES) items.push(null);
  // Последовательность страниц
  for (let page = left; page <= right; page++) items.push(page);
  // Пропуск
  if (right < count - 1) items.push(null);
  // Последняя страница
  if (right < count) items.push(count);

  const onClickHandler = (number: number) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onhandler(number);
  };

  return(
    <S.PaginationContainer>
      <S.List>
        {items.map((number, index) => (
          <li key={index}>
            {number
              ? (number === props.currentPage
                ? (<S.LinkActivePage to={props.link(number)} onClick={onClickHandler(number)}>{number}</S.LinkActivePage>)
                : (<S.LinkPage to={props.link(number)} onClick={onClickHandler(number)}>{number}</S.LinkPage>) )
              : ("...")}
          </li>
        ))}
      </S.List>
    </S.PaginationContainer>
  );
};

export default memo(Pagination);
