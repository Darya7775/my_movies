import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyles } from "./styles";
import { GlobalFonts } from "../../fonts";
import Layout from "../base/layout";
import Main from "../page/main";
import Login from "../page/login";
import Register from "../page/register";
import ResetPassword from "../page/reset_password";
import CheckEmail from "../page/check_email";
import DataUser from "../page/data_user";
import MoviePage from "../page/movie";
import Protected from "../containers/protected";
import FavoritesMovies from "../page/favorites_movies";

const App: React.FC = () => {

  return (
    <BrowserRouter>

      <GlobalFonts />
      <GlobalStyles />

      <Routes>
        <Route element={<Layout />}>

          <Route path={"/"} element={<Navigate replace to={"/:id"} />} />
          <Route path={"/:id"} element={<Main />} />

          <Route path={"/movie/:idmovie/"} element={<MoviePage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/data_user"} element={<Protected redirect="/login"><DataUser /></Protected>} />
          <Route path={"/movies"} element={<FavoritesMovies />} />

          <Route path={"/reset_password/"} >
            <Route index element={<ResetPassword />} />
            <Route path={"check_email"} element={<CheckEmail />} />
          </Route>

        </Route>
      </Routes>

    </BrowserRouter>
  );
};

export default App;
