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
    price: number;
    productName: String;
    size: {
      q: number;
      size: string;
    }[];

    subCategory: String;
  };
};

const ProductPage = () => {
  const { cart, IncreaseCartQuantity } = useCart();
  const [product, setProduct] = useState<Iproduct["product"]>();
  const [sizeSelected, setSizeSelected] = useState<boolean>(true);
  const [emptySize, setEmptySize] = useState(false);
  const [changeInSize, setChangeInSize] = useState<boolean>();

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

  const SizeQuantity = () => {
    const e = document.getElementById("selectSize") as HTMLSelectElement;
    const SizeQ = product?.size.find((item) => item.size === e.value)?.q as any;
    const Cart = cart
      .find((item) => item.id === ProductId)
      ?.sizes.find((size) => size.size === e.value);

    if (Cart?.q) {
      if (Cart.q > 0) {
        return SizeQ - Cart.q;
      } else if (Cart.q === 0) {
        return 0;
      }
    } else {
      return SizeQ;
    }
  };

  const addToBag = () => {
    var e = document.getElementById("selectSize") as HTMLSelectElement;
    const SizeQ = product?.size.find((item) => item.size === e.value)?.q as any;
    const Cart = cart
      .find((item) => item.id === ProductId)
      ?.sizes.find((size) => size.size === e.value);
    if (e.value === "Select Size") {
      setEmptySize(true);
    } else {
      setEmptySize(false);
      IncreaseCartQuantity(ProductId, e.value);
      setSizeSelected(true);
      if (Cart) {
        if (SizeQ - Cart?.q === 1) {
          setProduct((currentProduct) => {
            if (currentProduct) {
              const updatedSizeList = currentProduct.size.filter((item) => {
                return item.size !== String(e.value);
              });
              return { ...currentProduct, size: updatedSizeList };
            }
          });
        } else {
          e.value = "Select Size";
        }
      } else {
        e.value = "Select Size";
      }
    }
  };

  return (
    <div className="bg-black text-white text-sm p-10 gap-10 flex flex-col md:flex-row ">
      <div className=" w-3/4 flex md:flex-col gap-5 bg-black ">
        {product?.images.map((image) => (
          <img
            src={image}
            key={image}
            alt="Product"
            className="w-full h-1/2 object-contain"
          />
        ))}
      </div>
      <div className="flex flex-col w-full sticky top-10 self-start gap-10">
        <span className="text-xl">{product?.productName}</span>
        <div className="flex gap-2">
          <span>Rs.</span>
          <span>{product?.price.toString()}</span>
        </div>
        <div className="flex gap-2 flex-col gap-10">
          <select
            className="text-white bg-black border border-white p-1"
            name="selectSize"
            id="selectSize"
            onChange={() => {
              setEmptySize(false);
              setChangeInSize(!changeInSize);
              setSizeSelected(false);
            }}
          >
            <option selected>Select Size</option>
            {sizes.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
          <div
            className={`flex gap-2 text-sm ${
              sizeSelected ? "hidden" : "block"
            }`}
          >
            <span className={`text-xs ${sizeSelected ? "hidden" : "block"}`}>
              {`${changeInSize ? SizeQuantity() : SizeQuantity()}`} more left
            </span>
          </div>
          <span className={`text-red-400 ${emptySize ? "block" : "hidden"}`}>
            Please select size !
          </span>
        </div>
        <div>{product?.description}</div>
        <div className="flex flex-col gap-2">
          <div className="">
            <button
              onClick={() => addToBag()}
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
