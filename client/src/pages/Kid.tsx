import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { iProducts } from "../interfaces/ProductInterface";
import { scrollToTop } from "../utils/ScrolToTop";

const Men = () => {
  const [products, setProducts] = useState<iProducts["products"]>([]);
  const [Kids, setKids] = useState<iProducts["products"]>([]);

  useEffect(() => {
    scrollToTop();

    axios({
      method: "Get",
      url: "http://localhost:5000/api/vendor/getProduct",
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setKids(products.filter((item) => item.category === "Kids"));
  }, [products]);

  return (
    <div className="flex flex-col items-center p-10 min-h-screen max-h-full w-full gap-10 bg-white text-black">
      <div className="text-xl underline underline-offset-8">Kids</div>
      <div className="flex w-full flex-col gap-2 sm:flex-row justify-between">
        <div className="flex gap-1">
          <span>Sort by category:</span>
          <select name="" id="" className="bg-white focus:outline-none w-32">
            <option value="">Select</option>
            <option value="">Hoodies</option>
            <option value="">Hoodies</option>
          </select>
        </div>
        <div className="flex gap-1">
          <span>Sort by price: </span>
          <select name="" id="" className="bg-white focus:outline-none w-32">
            <option value="">Select</option>
            <option value="">Price low to high</option>
            <option value="">Price high to low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
        {Kids.map((men) => (
          <ProductCard
            _id={men._id}
            date={men.date}
            coverPhoto={men.coverPhoto}
            productName={men.productName}
            price={men.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Men;
