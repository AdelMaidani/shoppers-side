import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Accessories from "../assets/Covers/Accessories.jpg";
import Kid from "../assets/Covers/Kid.jpg";
import Men from "../assets/Covers/Men.jpg";
import Women from "../assets/Covers/Women.webp";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/ScrolToTop";
import axios from "axios";
import { iProducts } from "../interfaces/ProductInterface";

const Home = () => {
  const [mens, setMens] = useState<iProducts["products"]>([]);

  useEffect(() => {
    scrollToTop();
    axios({
      method: "Get",
      url: "http://localhost:5000/api/vendor/getProduct",
    })
      .then((res) => setMens(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-xs sm:text-sm bg-black h-full flex flex-col items-center p-10 text-white gap-10">
      {/* SHOP BY CATEGORY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
        <div className="relative max-h-72 sm:max-h-96 max-w-80 bg-white">
          <img
            src={Men}
            alt="men"
            className="max-h-72 sm:max-h-96 w-full grayscale hover:grayscale-0 duration-500 object-cover"
          />
          <Link
            to={"/men"}
            className="absolute top-3/4 left-5 bg-black p-2 duration-500 hover:bg-white hover:text-black"
          >
            SHOP MEN
          </Link>
        </div>
        <div className="max-h-72 relative sm:max-h-96 max-w-80 bg-white">
          <img
            src={Women}
            alt=""
            className="max-h-72 sm:max-h-96 w-full grayscale hover:grayscale-0 duration-500 object-cover"
          />
          <Link
            to={"/women"}
            className="absolute top-3/4 left-2 bg-black p-2 duration-500 hover:bg-white hover:text-black"
          >
            SHOP WOMEN
          </Link>
        </div>
        <div className="max-h-72 relative sm:max-h-96 max-w-80 bg-white">
          <img
            src={Kid}
            alt="Kid"
            className="max-h-72 sm:max-h-96 w-full grayscale hover:grayscale-0 duration-500 object-cover"
          />
          <Link
            to={"/kid"}
            className="absolute top-3/4 left-2 bg-black p-2 duration-500 hover:bg-white hover:text-black"
          >
            SHOP KIDS
          </Link>
        </div>
        <div className="max-h-72 relative sm:max-h-96 max-w-80 bg-white">
          <img
            src={Accessories}
            alt="accessories"
            className="max-h-72 sm:max-h-96 w-full grayscale hover:grayscale-0 duration-500 object-cover"
          />
          <Link
            to={"/accessories"}
            className="absolute top-3/4 left-2 flex gap-1 bg-black p-2 duration-500 hover:bg-white hover:text-black"
          >
            <span className="hidden sm:block">SHOP</span> ACCESORIES
          </Link>
        </div>
      </div>
      {/* WOMENS PRODUCTS SLIDER */}
      <span>Womens Best Sellers</span>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {mens.map((item) => (
            <ProductCard
              _id={item._id}
              date={item.date}
              coverPhoto={item.coverPhoto}
              productName={item.productName}
              price={item.price}
            />
          ))}
        </div>
      </div>
      {/* Mens PRODUCTS SLIDER */}
      <span>Mens Best Sellers</span>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {mens.map((item) => (
            <ProductCard
              _id={item._id}
              date={item.date}
              coverPhoto={item.coverPhoto}
              productName={item.productName}
              price={item.price}
            />
          ))}
        </div>
      </div>
      {/* Kids PRODUCTS SLIDER */}
      <span>Kids Best Sellers</span>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {mens.map((item) => (
            <ProductCard
              _id={item._id}
              date={item.date}
              coverPhoto={item.coverPhoto}
              productName={item.productName}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
