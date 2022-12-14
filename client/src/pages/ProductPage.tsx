import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/ScrolToTop";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

type Iproduct = {
  product: {
    id: string;
    category: string;
    coverPhoto: String;
    date: Date;
    description: String;
    images: [];
    price: Number;
    productName: String;
    size: [
      {
        q: string;
        size: string;
      }
    ];
    subCategory: String;
  };
};

const ProductPage = () => {
  const { cart, IncreaseCartQuantity, DecreaseCartQuantity } = useCart();
  const [product, setProduct] = useState<Iproduct["product"]>();
  const [sizeSelected, setSizeSelected] = useState<boolean>(true);

  const id = useParams();
  const ProductId = id.productId as string;

  useEffect(() => {
    scrollToTop();

    axios({
      method: "Post",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/customer/publicGetProduct",
      data: { id: id.productId },
    })
      .then((res) => setProduct(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  // Size
  const sizes = [] as Array<string>;
  product?.size.forEach((i) => {
    sizes.push(i.size);
  });

  // Add to bag
  const addToBag = () => {
    var e = document.getElementById("selectSize") as HTMLSelectElement;

    if (e.value === "Select Size") {
      setSizeSelected(false);
    } else {
      IncreaseCartQuantity(ProductId, e.value);
      setSizeSelected(true);
      e.value = "Select Size";
    }
  };

  const removeItem = () => {
    DecreaseCartQuantity(ProductId, "Large");
  };

  // cart.find((item) => item.id === ProductId && item.size === "Medium");

  return (
    <div className="bg-black text-white text-xs p-10 flex">
      <div className="h-full w-full flex flex-col gap-5 bg-black">
        {product?.images.map((image) => (
          <img
            src={image}
            key={image}
            alt=""
            className="h-screen w-full object-contain"
          />
        ))}
      </div>
      <div className="flex flex-col w-full sticky top-10 self-start gap-10">
        <span className="text-xl">{product?.productName}</span>
        <div className="flex gap-2">
          <span>Rs.</span>
          <span>{product?.price.toString()}</span>
        </div>
        <div className="flex gap-2 items-center">
          <select
            className="text-white bg-black border border-white p-1"
            name="selectSize"
            id="selectSize"
          >
            <option>Select Size</option>
            {sizes.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
          <span className={`text-red-400 ${sizeSelected ? "hidden" : "block"}`}>
            Please select size !
          </span>
        </div>
        <div>{product?.description}</div>
        <div className="flex flex-col gap-2">
          <div className="">
            <button
              onClick={addToBag}
              className="bg-black text-white border border-white p-1 w-32 text-center"
            >
              Add to bag
            </button>
          </div>
          <button className="bg-black text-white border border-white p-1 w-32 text-center">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
