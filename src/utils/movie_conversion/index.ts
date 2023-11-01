import * as T from "../../types";

/**
 * преобразование данных о фильмах
 * @param data объект c данными о фильмах, где genres - массив с id жанров
 * @param dataGenres объект c массивом жанров и их id
 * @returns объект, где genres - массив с названиями жанров
 */

export const conversionMovie = (dataArray: T.OneMovieMain[], dataGenres: T.Genres) => {
  let getArray = dataArray;

  // преобразование жанров в обЪект
  const normalGenres = dataGenres.genres.reduce((accOb, genre) => {
    accOb[String(genre.id)] = genre.name;
    return accOb;
  }, {} as T.NormalGenresTypes);

  // замена массива жанров с числами на массив жанров с названиями
  getArray = dataArray.map(movie => {
    movie.genre_ids = movie.genre_ids.reduce((acc, curGenge) => (acc.push(normalGenres[curGenge]), acc), [] as string[]);
    return movie;
  });

  // добавление флага в/не избранном
  let favMov = {} as { [key: string]: object };
  if(localStorage.getItem("favoritesMovies")) {
    favMov = JSON.parse(localStorage.getItem("favoritesMovies") as string);
  }
  for(let i = 0; i < getArray.length; i++) {
    const id = getArray[i].id;
    if(favMov[id]){
      getArray[i].isFav = true;
    } else {
      getArray[i].isFav = false;
    }
  }

  return getArray;
};

export const addMarketFavOneMov = (movie: T.OneMoviePage) => {
  let favMov = {} as { [key: string]: object };
  if(localStorage.getItem("favoritesMovies")) {
    favMov = JSON.parse(localStorage.getItem("favoritesMovies") as string);

    if(favMov[movie.id]) {
      movie.isFav = true;
    } else {
      movie.isFav = false;
    }
  }

  return movie;
};
