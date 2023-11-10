import { changeArray } from ".";
import * as T from "../../types";

test("changeArray movie OneMovieMain", () => {
  const genres: T.Genres = {
    genres: [
      {id: 28, name: "Action"},
      {id: 12, name: "Adventure"},
      {id: 16, name: "Animation"},
      {id: 35, name: "Comedy"},
      {id: 80, name: "Crime"},
      {id: 99, name: "Documentary"},
      {id: 18, name: "Drama"},
      {id: 10751, name: "Family"},
      {id: 14, name: "Fantasy"},
      {id: 36, name: "History"},
      {id: 27, name: "Horror"},
      {id: 10402, name: "Music"},
      {id: 9648, name: "Mystery"},
      {id: 10749, name: "Romance"},
      {id: 878, name: "Science Fiction"},
      {id: 10770, name: "TV Movie"},
      {id: 53, name: "Thriller"},
      {id: 10752, name: "War"},
      {id: 37, name: "Western"}
    ]
  };

  const movie = [{
    adult: false,
    backdrop_path: "/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
    genre_ids: [ "27", "9648" ],
    id: 507089,
    isFav: false,
    original_language: "en",
    original_title: "Five Nights at Freddy's",
    overview: "Recently fired and desperate for work",
    popularity: 5818.278,
    poster_path: "/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
    release_date: "2023-10-25",
    title: "Five Nights at Freddy's",
    video: false,
    vote_average: 8.372,
    vote_count: 1207
  }];

  const movieResult = [{
    adult: false,
    backdrop_path: "/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
    genre_ids: [ "Horror", "Mystery" ],
    id: 507089,
    isFav: false,
    original_language: "en",
    original_title: "Five Nights at Freddy's",
    overview: "Recently fired and desperate for work",
    popularity: 5818.278,
    poster_path: "/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
    release_date: "2023-10-25",
    title: "Five Nights at Freddy's",
    video: false,
    vote_average: 8.372,
    vote_count: 1207
  }];

  expect(changeArray(movie, genres)).toEqual(movieResult);
});
