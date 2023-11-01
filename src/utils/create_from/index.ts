import * as T from "../../types";

/**
 * универсальная функция для создания объекта с нужными ключами
 * @param source объект c лишними данными
 * @param template шаблон, как должен выглядеть объект
 * @returns требуемый объект
 */

const createFrom = <Type extends object>(source: Type, template: Type) => {
  const target = {} as Type;

  for (const key in template) {
    const keyName = key as keyof Type;
    target[keyName] = source[keyName];
  }

  return target;
};

/**
 * для создания объекта фильмв
 * @param source объект c лишними данными
 * @returns требуемый объект
 *
 * template: T.FavInMovOne | T.OneMovieMain = {
    id: 1,
    backdrop_path: "string",
    genres: [],
    poster_path: "string",
    vote_average: 7,
    title: "string",
    release_date: "string",
    isFav: true
  }
 */

const createMovieFrom = (source: T.FavInMovOne | T.OneMovieMain) => {
  const template: T.FavInMovOne | T.OneMovieMain = {
    id: 1,
    backdrop_path: "string",
    genres: [],
    genre_ids: [],
    poster_path: "string",
    vote_average: 7,
    title: "string",
    release_date: "string",
    isFav: true
  };

  return createFrom(source, template);
};

export default createMovieFrom;
