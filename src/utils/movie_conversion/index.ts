import * as T from "../../slices_redux/types";

/**
 * преобразование данных о фильмах
 * @param data объект c данными о фильмах, где genres - массив с id жанров
 * @param dataGenres объект c массивом жанров и их id
 * @returns объект, где genres - массив с названиями жанров
 */

const conversionMovie = (dataArray: T.OneMovieMain[], dataGenres: T.Genres) => {

  // преобразование жанров в обЪект
  const normalGenres = dataGenres.genres.reduce((accOb, genre) => (accOb[String(genre.id)] = genre.name, accOb), {} as T.NormalGenresTypes);

  // замена массива жанров с числами на массив жанров с названиями
  dataArray = dataArray.map(movie => {
    movie.genre_ids = movie.genre_ids.reduce((acc, curGenge) => (acc.push(normalGenres[curGenge]), acc), [] as string[]);
    return movie;
  });

  return dataArray;
};

export default conversionMovie;
