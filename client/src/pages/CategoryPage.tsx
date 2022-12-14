import React from "react";
// import ProductCard from "../components/ProductCard";
import { scrollToTop } from "../utils/ScrolToTop";

const CategoryPage = () => {
  React.useEffect(() => scrollToTop(), []);
  return (
    <div className="p-10 flex flex-col gap-10 text-white bg-black">
      <div className="flex flex-col gap-5 sm:flex-row justify-between sm:items-center">
        <span className="text-lg underline underline-offset-4">Hoodies</span>
        <div className="flex gap-2">
          <span>Sort by: </span>
          <select name="" id="" className="bg-black w-32">
            <option value="">Select</option>
            <option value="">Price low to high</option>
            <option value="">Price high to low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
        {/* <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
    </div>
  );
};

export default CategoryPage;
