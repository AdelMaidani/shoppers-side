import React from "react";
import { NavLink } from "react-router-dom";

const UserNav = () => {
  return (
    <div className="flex gap-10 justify-center">
      <NavLink
        style={({ isActive }) => ({
          textDecoration: isActive ? "underline" : "none",
          textUnderlineOffset: isActive ? "8px" : "none",
          border: isActive ? "none" : "",
        })}
        to={"/Dashboard/myorders"}
      >
        My orders
      </NavLink>
    </div>
  );
};

export default UserNav;
