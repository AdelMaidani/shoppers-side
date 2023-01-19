import { useEffect, useState, useRef } from "react";
import { scrollToTop } from "../utils/ScrolToTop";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";

type Iproduct = {
  product: {
    _id: string;
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

type sizes = {
  size: string;
  q: number;
}[];

const ProductPage = () => {
  const { cart, IncreaseCartQuantity } = useCart();
  const [product, setProduct] = useState<Iproduct["product"]>();
  const [sizeSelected, setSizeSelected] = useState<boolean>(true);
  const [emptySize, setEmptySize] = useState(false);
  const [changeInSize, setChangeInSize] = useState<boolean>();
  const [width, setWidth] = useState(0);

  const id = useParams();
  const ProductId = id.productId as string;
  const carousel = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    scrollToTop();

    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);

    axios({
      method: "Post",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/customer/publicGetProduct",
      data: { id: id.productId },
    })
      .then((res) => setProduct(res.data[0]))
      .catch((err) => console.log(err));
  }, [carousel?.current?.scrollWidth]);

  // Size
  const [sizes, setSizes] = useState<sizes>();

  useEffect(() => {
    setSizes(product?.size);

    if (cart) {
      const cartItem = cart.find((item: any) => item.id === ProductId)?.sizes;
      const allSizes = product?.size;

      if (cartItem) {
        allSizes?.map((items) => {
          if (
            cartItem.find((it) => it.size === items.size && it.q === items.q)
          ) {
            setProduct((currentProduct) => {
              if (currentProduct) {
                const updatedSizeList = currentProduct.size.filter((item) => {
                  return item.size !== items.size;
                });
                return { ...currentProduct, size: updatedSizeList };
              }
            });
          }
        });
      }
    }
  }, [product]);

  const e = document.getElementById("selectSize") as HTMLSelectElement;

  const SizeQuantity = () => {
    const SizeQ = product?.size.find((item) => item.size === e.value)?.q as any;
    if (e) {
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
    <div
      ref={carousel}
      className="bg-white overflow-hidden md:overflow-clip text-black text-md p-10 min-h-screen max-h-full gap-10 flex flex-col md:flex-row"
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="bg-black w-3/4 h-full flex gap-5 md:hidden"
      >
        {product?.images.map((image) => (
          <img
            src={image}
            key={image}
            alt="Product"
            className="w-full h-1/2 object-contain"
          />
        ))}
      </motion.div>
      <div className="w-3/4 hidden md:flex md:flex-col gap-5">
        {product?.images.map((image) => (
          <img
            src={image}
            key={image}
            alt="Product"
            className="w-full h-screen object-contain"
          />
        ))}
      </div>
      <div className="flex flex-col w-full sticky top-32 self-start gap-10">
        <span className="text-xl font-bold">{product?.productName}</span>
        <div className="flex gap-2">
          <span>Rs.</span>
          <span>{product?.price.toString()}</span>
        </div>
        <div className="flex gap-2 flex-col gap-10">
          <select
            className="text-white hover:text-black hover:bg-white duration-500 border-black bg-black border border-white p-1"
            name="selectSize"
            id="selectSize"
            onChange={() => {
              setEmptySize(false);
              setChangeInSize(!changeInSize);
              setSizeSelected(false);
            }}
          >
            <option selected>Select Size</option>
            {sizes?.map((siz: any) => (
              <option key={siz.value} value={siz.size}>
                {siz.size}
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
              className="bg-black hover:text-black hover:bg-white border-black duration-500 text-white border border-white p-1 w-32 text-center"
            >
              Add to bag
            </button>
          </div>
          <button
            className={`bg-black hover:text-black hover:bg-white border-black duration-500 text-white border border-white p-1 w-32 text-center ${
              cart.length == 1 ? "block" : "hidden"
            } `}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
