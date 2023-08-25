import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../base/layout";
import Main from "../page/main";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
