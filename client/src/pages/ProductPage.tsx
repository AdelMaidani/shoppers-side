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
  const {
    getItemQuantity,
    increaceCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useCart();
  const [product, setProduct] = useState<Iproduct["product"]>();
  const [sizeSelected, setSizeSelected] = useState<boolean>(true);

  const id = useParams();

  const ProductId = id.productId as string;

  const quantity = getItemQuantity(ProductId);

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

  const sizes = [] as Array<string>;

  product?.size.forEach((i) => {
    sizes.push(i.size);
  });

  const addToBag = () => {
    const size = document.getElementById("selectSize") as HTMLOptionElement;
    if (size.value === "Select Size") {
      setSizeSelected(false);
    } else {
      increaceCartQuantity(ProductId);
      size.value = "Select Size";
      setSizeSelected(true);
    }
  };
  console.log(sizeSelected);

  return (
    <div className="bg-black text-white p-10 grid justify-center grid-cols-2">
      <div className="h-full w-96 flex flex-col gap-5 bg-black">
        {product?.images.map((image) => (
          <img
            src={image}
            key={image}
            alt=""
            className="h-full w-full object-contain"
          />
        ))}
      </div>
      <div className="flex flex-col sticky top-10 self-start gap-10">
        <span className="text-xl">{product?.productName}</span>
        <div className="flex gap-2">
          <span>Rs.</span>
          <span>{product?.price.toString()}</span>
        </div>
        <div className="flex gap-2 items-center">
          <select
            className="text-white bg-black border border-white p-1"
            name=""
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
        <div className="flex flex-col gap-4">
          {quantity === 0 ? (
            <div className="h-20">
              <button
                onClick={addToBag}
                className="bg-black text-white border border-white p-1 w-32 text-center"
              >
                Add to bag
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5 h-20">
              <div className="flex gap-4">
                <button onClick={() => increaceCartQuantity(ProductId)}>
                  +
                </button>
                {quantity}
                <button onClick={() => decreaseCartQuantity(ProductId)}>
                  -
                </button>
              </div>
              {quantity > 1 ? (
                <button
                  onClick={() => removeFromCart(ProductId)}
                  className="border p-1 border-red-400 text-red-400"
                >
                  Remove all
                </button>
              ) : null}
            </div>
          )}
          <button className="bg-black text-white border border-white p-1 w-32 text-center">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
