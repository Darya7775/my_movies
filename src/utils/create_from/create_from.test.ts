import createMovieFrom from ".";

test("create from OneMoviePage into template", () => {
  const source = {
    adult: false,
    backdrop_path: "/h7BoGo4NhckWRiMUCi3Qr8GwBDA.jpg",
    belongs_to_collection: null,
    budget: 0,
    credits: {
      cast: [],
      crew: []
    },
    genres: [
      {
        id: 1,
        name: "string"
      },
      {
        id: 2,
        name: "string2"
      }],
    homepage: "",
    id: 1039690,
    imdb_id: "tt14633464",
    isFav: false,
    original_language: "en",
    original_title: "Desperation Road",
    overview: "After 11 years in a Mississippi state prison...",
    popularity: 1232.925,
    poster_path: "/tPyj6Gii1HrnzCbJXEF7JdSFkQ8.jpg",
    production_companies: [{}, {}],
    production_countries: [{}],
    recommendations: { page: 1, results: [], total_pages: 0, total_results: 0 },
    release_date: "2023-10-19",
    revenue: 0,
    runtime: 112,
    spoken_languages: [{}],
    status: "Released",
    tagline: "The road to redemption is twisted.",
    title: "Desperation Road",
    video: false,
    videos: {results: [{}, {}]},
    vote_average: 7.65,
    vote_count: 20
  };

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
    isFav: false
  };
  expect(createMovieFrom(source)).toEqual(templateBe);
});

test("create from OneMovieMain into template", () => {
  const source = {
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
  };

  const templateBe = {
    id: 507089,
    backdrop_path: "/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
    genre_ids: [ "Horror", "Mystery" ],
    poster_path: "/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
    vote_average: 8.372,
    title: "Five Nights at Freddy's",
    release_date: "2023-10-25",
    isFav: false
  };
  expect(createMovieFrom(source)).toEqual(templateBe);
});
