import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
const Main = () => {
  return (
    <header>
      <Header></Header>
      <Outlet></Outlet>
    </header>
  );
};

export default Main;
