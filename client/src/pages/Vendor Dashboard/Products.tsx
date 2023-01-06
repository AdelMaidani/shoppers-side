import { useState, useEffect } from "react";
import axios from "axios";
import DashNav from "../../components/VendorNav";
import { iProducts } from "../../interfaces/ProductInterface";
import MyProductCard from "../../components/MyProductCard";

const Products = () => {
  const [products, setProducts] = useState<iProducts["products"]>([]);

  useEffect(() => {
    axios({
      method: "Get",
      url: "http://localhost:5000/api/vendor/getProduct",
    })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-10 flex gap-10 flex-col">
      <DashNav />
      <div className="flex flex-col gap-2 sm:flex-row max-w-full justify-between">
        <div className="flex gap-1 border p-1 border-black ">
          <span>Sort by category:</span>
          <select name="" id="" className="max-w-32 bg-white">
            <option value="">Select</option>
            <option value="">Hoodies</option>
            <option value="">Hoodies</option>
          </select>
        </div>
        <div className="flex gap-1 border p-1 border-black ">
          <span>Sort by price: </span>
          <select name="" id="" className="max-w-32 bg-white">
            <option value="">Select</option>
            <option value="">Price low to high</option>
            <option value="">Price high to low</option>
          </select>
        </div>
      </div>
      {/* Cards */}
      <div className="flex-col sm:flex gap-2 items-center sm:text-center">
        <div className="hidden sm:flex h-20 bg-black text-center w-full items-center justify-around text-white">
          <span className="w-20">Product ID</span>
          <span className="w-20">Date</span>
          <span className="w-32">Cover</span>
          <span className="w-32">Product Name</span>
          <span className="w-32">Quantity Left</span>
          <span className="w-20">Sold</span>
        </div>
        {products.map((product) => (
          <MyProductCard
            productName={product.productName}
            coverPhoto={product.coverPhoto}
            _id={product._id}
            key={product._id}
            date={product.date}
            size={product?.size}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
