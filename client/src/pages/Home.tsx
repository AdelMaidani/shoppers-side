import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Accessories from "../assets/Covers/Accessories.jpg";
import Kid from "../assets/Covers/Kid.jpg";
import Men from "../assets/Covers/Men.jpg";
import Women from "../assets/Covers/Women.webp";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/ScrolToTop";
import axios from "axios";
import banner from "../assets/Covers/banner.png";
import { iProducts } from "../interfaces/ProductInterface";

const Home = () => {
  const [products, setProducts] = useState<iProducts["products"]>([]);
  const [mens, setMens] = useState<iProducts["products"]>([]);
  const [womans, setWoman] = useState<iProducts["products"]>([]);
  const [kids, setKids] = useState<iProducts["products"]>([]);

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
    setMens(products.filter((items) => items.category === "Men"));
    setWoman(products.filter((items) => items.category === "Women"));
    setKids(products.slice(0, 5).filter((items) => items.category === "Kid"));
  }, [products]);

  return (
    <div className="text-xs sm:text-sm bg-white min-h-screen h-full flex flex-col items-center p-10 text-black gap-10">
      {/* Banner */}
      <div className="flex flex-col items-center w-3/4">
        <img src={banner} alt="banner" className="w-full object-contain" />
      </div>
      {/* SHOP BY CATEGORY */}
      <span className="text-xl underline underline-offset-8">Category</span>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="relative max-h-72 sm:max-h-96 max-w-80 bg-white">
          <img
            src={Men}
            alt="men"
            className="max-h-72 sm:max-h-96 w-full object-cover"
          />
          <Link
            to={"/men"}
            className="text-black absolute top-3/4 left-5 bg-white p-2 duration-500 hover:bg-black hover:text-white"
          >
            SHOP MEN
          </Link>
        </div>
        <div className="max-h-72 relative sm:max-h-96 max-w-80 bg-white">
          <img
            src={Women}
            alt=""
            className="max-h-72 sm:max-h-96 w-full object-cover"
          />
          <Link
            to={"/women"}
            className="text-black absolute top-3/4 left-2 bg-white p-2 duration-500 hover:bg-black hover:text-white"
          >
            SHOP WOMEN
          </Link>
        </div>
        <div className="max-h-72 relative sm:max-h-96 max-w-80 bg-white">
          <img
            src={Kid}
            alt="Kid"
            className="max-h-72 sm:max-h-96 w-full object-cover"
          />
          <Link
            to={"/kid"}
            className="text-black absolute top-3/4 left-2 bg-white p-2 duration-500 hover:bg-black hover:text-white"
          >
            SHOP KIDS
          </Link>
        </div>
        <div className="max-h-72 relative sm:max-h-96 max-w-80 bg-white">
          <img
            src={Accessories}
            alt="accessories"
            className="max-h-72 sm:max-h-96 w"
          />
          <Link
            to={"/accessories"}
            className="text-black absolute top-3/4 left-2 flex gap-1 bg-white p-2 duration-500 hover:bg-black hover:text-white"
          >
            <span className="hidden sm:block">SHOP</span> ACCESORIES
          </Link>
        </div>
      </div>
      {/* WOMENS PRODUCTS SLIDER */}
      <span className="text-xl underline underline-offset-8">
        Womens Best Sellers
      </span>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
          {womans.slice(0, 5).map((item) => (
            <ProductCard
              _id={item._id}
              date={item.date}
              key={item._id}
              coverPhoto={item.coverPhoto}
              productName={item.productName}
              price={item.price}
            />
          ))}
        </div>
      </div>
      {/* Mens PRODUCTS SLIDER */}
      <span className="text-xl underline underline-offset-8">
        Mens Best Sellers
      </span>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-10">
          {mens.slice(0, 5).map((item) => (
            <ProductCard
              _id={item._id}
              key={item._id}
              date={item.date}
              coverPhoto={item.coverPhoto}
              productName={item.productName}
              price={item.price}
            />
          ))}
        </div>
      </div>
      {/* Kids PRODUCTS SLIDER */}
      <span className="text-xl underline underline-offset-8">
        Kids Best Sellers
      </span>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
          {kids.slice(0, 5).map((item) => (
            <ProductCard
              _id={item._id}
              key={item._id}
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
