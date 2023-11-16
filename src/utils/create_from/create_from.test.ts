import createMovieFrom from ".";
import oneMoviePageMock from "../../mock-data/one_movie_page.mock";
import oneMovieMainMock from "../../mock-data/one_movie_main.mock";

test("create from OneMoviePage into template", () => {
  const templateBe = {
    id: 1039690,
    backdrop_path: "/h7BoGo4NhckWRiMUCi3Qr8GwBDA.jpg",
    genres: [{
      id: 1,
      name: "string"
    },
    {
      id: 2,
      name: "string2"
    }],
    poster_path: "/tPyj6Gii1HrnzCbJXEF7JdSFkQ8.jpg",
    vote_average: 7.65,
    title: "Desperation Road",
    release_date: "2023-10-19",
    isFav: true
  };
  expect(createMovieFrom(oneMoviePageMock)).toEqual(templateBe);
});

test("create from OneMovieMain into template", () => {
  const templateBe = {
    id: 507089,
    backdrop_path: "/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
    genre_ids: [ "Horror", "Mystery" ],
    poster_path: "/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
    vote_average: 8.372,
    title: "Five Nights at Freddy's",
    release_date: "2023-10-25",
    isFav: true
  };
  expect(createMovieFrom(oneMovieMainMock)).toEqual(templateBe);
});
