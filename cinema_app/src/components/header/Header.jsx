import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex items-center justify-center my-10 text-white transition-all cursor-pointer gap-x-5">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-primary" : "")}
        to="/movies"
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Header;
