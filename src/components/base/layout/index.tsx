import React, { memo } from "react";
import Header from "../header";
import Authorization from "../authorization";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Authorization />
      <Header />
      <Outlet />
    </>
  );
};

export default memo(Layout);
