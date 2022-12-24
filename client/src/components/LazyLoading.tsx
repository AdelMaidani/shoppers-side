import React from "react";
import loading from "../assets/LazyLoading.gif";

const LazyLoading = () => {
  return (
    <div className="flex bg-black h-screen justify-center items-center flex-col items-center">
      <img src={loading} className="h-60" alt="" />
    </div>
  );
};

export default LazyLoading;
