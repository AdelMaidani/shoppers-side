import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { iProducts } from "../interfaces/ProductInterface";
import { scrollToTop } from "../utils/ScrolToTop";

const Accesories = () => {
  const [products, setProducts] = useState<iProducts["products"]>([]);
  const [Accesories, setAccesories] = useState<iProducts["products"]>([]);

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
    setAccesories(products.filter((item) => item.category === "Accesories"));
  }, [products]);

  return (
    <div className="flex flex-col items-center p-10 min-h-screen max-h-full w-full gap-10 bg-black text-white">
      <div className="text-lg underline underline-offset-8">Accesories</div>
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
        {Accesories.map((Accesorie) => (
          <ProductCard
            _id={Accesorie._id}
            date={Accesorie.date}
            coverPhoto={Accesorie.coverPhoto}
            productName={Accesorie.productName}
            price={Accesorie.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Accesories;
