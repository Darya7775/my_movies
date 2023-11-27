import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithProvidersAndBrowserRouter } from "../../../utils/test_utils";
import { addLocalStorageMovie } from "../../../utils/local_storage";
import "../../../mock-data/matchMedia.mock";
import arrayOneMovieMain from "../../../mock-data/array_one_movie_main.mock";
import { Route } from "react-router-dom";
import FavoritesMovies from ".";

describe("FavoritesMovies page component", () => {
  it("delete one movie", async() => {

    addLocalStorageMovie(arrayOneMovieMain[0].id, arrayOneMovieMain[0]);
    addLocalStorageMovie(arrayOneMovieMain[1].id, arrayOneMovieMain[1]);
    addLocalStorageMovie(arrayOneMovieMain[2].id, arrayOneMovieMain[2]);

    renderWithProvidersAndBrowserRouter(
      <Route path={"/movies"} element={<FavoritesMovies />} />,
      "/movies",
      { preloadedState: {favoritesMovies: { arrayMovies: arrayOneMovieMain}}}
    );

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(arrayOneMovieMain.length);

    const [oneBut] = screen.getAllByRole("button");
    await userEvent.click(oneBut);
    const numbersOfMoviesInLS = 2;

    expect(Object.keys(JSON.parse(localStorage.getItem("favoritesMovies") as string)).length).toBe(numbersOfMoviesInLS);
    expect(screen.getAllByRole("listitem")).toHaveLength(numbersOfMoviesInLS);
    expect(screen.queryByText(/Expend4bles/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Five Nights at Freddy's/i)).toBeInTheDocument();
    expect(screen.getByText(/Sound of Freedom/i)).toBeInTheDocument();
  });

  it("delete all movies", async() => {

    addLocalStorageMovie(arrayOneMovieMain[0].id, arrayOneMovieMain[0]);
    addLocalStorageMovie(arrayOneMovieMain[1].id, arrayOneMovieMain[1]);
    addLocalStorageMovie(arrayOneMovieMain[2].id, arrayOneMovieMain[2]);

    renderWithProvidersAndBrowserRouter(
      <Route path={"/movies"} element={<FavoritesMovies />} />,
      "/movies",
      { preloadedState: {favoritesMovies: { arrayMovies: arrayOneMovieMain}}}
    );

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(arrayOneMovieMain.length);

    await userEvent.click(screen.getByRole("button", {name: /Сlear out/i}));
    expect(JSON.parse(localStorage.getItem("favoritesMovies") as string)).toBeNull();
    expect(screen.queryAllByRole("listitem")).toEqual([]);
  });
});
