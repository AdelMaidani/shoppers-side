import React from "react";
import { NavLink } from "react-router-dom";

const VendorNav = () => {
  return (
    <div className="flex gap-10 text-xs justify-center">
      <NavLink
        style={({ isActive }) => ({
          textDecoration: isActive ? "underline" : "none",
          textUnderlineOffset: isActive ? "8px" : "none",
          border: isActive ? "none" : "",
        })}
        to={"/Dashboard/webpage"}
      >
        WebPage
      </NavLink>
      <NavLink
        to={"/Dashboard/products"}
        style={({ isActive }) => ({
          textDecoration: isActive ? "underline" : "none",
          textUnderlineOffset: isActive ? "8px" : "none",
          border: isActive ? "none" : "",
        })}
      >
        Products
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          textDecoration: isActive ? "underline" : "none",
          textUnderlineOffset: isActive ? "8px" : "none",
          border: isActive ? "none" : "",
        })}
        to={"/Dashboard/orders"}
      >
        Orders
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          textDecoration: isActive ? "underline" : "none",
          textUnderlineOffset: isActive ? "8px" : "none",
          border: isActive ? "none" : "",
        })}
        to={"/Dashboard/addproduct"}
      >
        Add Product
      </NavLink>
    </div>
  );
};

export default VendorNav;
