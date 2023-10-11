export type FetchingStatus = "idle" | "loading" | "succeeded" | "failed";

export interface DataUSer {
  displayName: string | null | undefined,
  email: string | null | undefined,
  phoneNumber: string | null | undefined,
}

export interface StateUser extends DataUSer {
  status: string,
  error: string | null,
  lettera: string | null | undefined
}

export interface OneMovieMain {
  readonly id: number,
  backdrop_path: string,
  genre_ids: string[],
  poster_path: string,
  vote_average: number,
  title: string,
  release_date: string,
  isFav: boolean
}

export interface StateMovies {
  status: FetchingStatus,
  count: number,
  error: string | undefined,
  readonly ids: number[],
  choosedCategory: string
  entities: {
    [key: string]: OneMovieMain
  },
  params: {
    q: string,
    include_adult: string,
    language: string,
    primary_release_year: string,
    page: number
  }
};

export interface Genres {
  genres: {id: number, name: string}[]
};

export interface AllMovies {
  results: OneMovieMain[],
  page: number,
  total_pages: number
}

export interface NormalGenresTypes {
  [key: string]: string
}

export interface OneMoviePage {
  readonly id: number,
  adult: boolean,
  backdrop_path: string,
  genres: {
    id: number,
    name: string
  }[],
  overview: string,
  poster_path: string,
  production_companies: {
    logo_path: string,
    name: string,
  }[],
  production_countries: {
    iso_3166_1: string,
    name: string
  }[],
  vote_average: number,
  title: string,
  release_date: string,
  runtime: number,
  videos: {
    results: {
      key: string,
      type: string
    }[]
  },
  credits: {
    cast: {
      character: string,
      original_name: string,
      profile_path: string,
      gender: number
    }[],
    crew: {
      job: string,
      original_name: string,
      profile_path: string,
      gender: number
    }[]
  },
  recommendations: {
    results: OneMovieMain[]
  },
  isFav: boolean
}

export interface StateOneMoviePage {
  status: FetchingStatus,
  error: string | undefined,
  movie: OneMoviePage,
  ids: number[],
  entities: {
    [key: string]: object
  }
};

export interface FavInMovOne {
  readonly id: number,
  backdrop_path: string,
  genres: {
    id: number,
    name: string
  }[],
  poster_path: string,
  vote_average: number,
  title: string,
  release_date: string,
  isFav: boolean
}

export interface StateFavoritesMovies { arrayMovies: Array<OneMovieMain | FavInMovOne> };
