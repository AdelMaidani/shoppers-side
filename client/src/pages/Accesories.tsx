import React from "react";
// import ProductCard from "../components/ProductCard";
import { scrollToTop } from "../utils/ScrolToTop";

const Accessories = () => {
  React.useEffect(() => scrollToTop(), []);
  return (
    <div className="flex flex-col items-center p-10 w-full gap-10 bg-black text-white">
      <div className="text-xl underline underline-offset-8">Accessories</div>
      <div className="flex w-full flex-col gap-2 sm:flex-row justify-between">
        <div className="flex gap-1">
          <span>Sort by category:</span>
          <select name="" id="" className="bg-black w-32">
            <option value="">select</option>
            <option value="">Hoodies</option>
            <option value="">Hoodies</option>
          </select>
        </div>
        <div className="flex gap-1">
          <span>Sort by price: </span>
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
    </div>
  );
};

export default Accessories;
