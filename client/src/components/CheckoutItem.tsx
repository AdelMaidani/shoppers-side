import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import CheckoutItemQuantity from "./CheckoutItemQuantity";

type product = {
  coverPhoto: string;
  productName: string;
  category: string;
  subCategory: string;
  _id: string;
};

type Sizes = {
  id: string;
  size: string;
  q: number;
}[];

const CheckoutItem = ({
  coverPhoto,
  productName,
  category,
  subCategory,
  _id,
}: product) => {
  const { cart, IncreaseCartQuantity } = useCart();

  const increaseQuantity = (id: string, size: string) => {};

  const sizes: any[] = [];

  return (
    <div>
      <div className="flex justify-between gap-5 border-b border-gray-500 pb-3">
        <div className="flex gap-5">
          {" "}
          {/* Product Picture */}
          <img
            src={coverPhoto}
            className="h-40 w-1/2 object-cover"
            alt="product"
          />
          {/* Product info */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="font-bold text-lg">{productName}</span>
              <div className="flex w-40 justify-between">
                <span>Product Id:</span>
                <span>{_id.split("", 6)}</span>
              </div>
            </div>
            <div>
              <div className="flex w-40 justify-between">
                <span>Category:</span>
                <span>{category}</span>
              </div>
              <div className="flex w-40 justify-between">
                <span>Sub category:</span>
                <span>{subCategory}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Product Price */}
        <div className="flex flex-col justify-between">
          <div>
            {sizes.map((item) => (
              <CheckoutItemQuantity
                increaseQuantity={increaseQuantity}
                size={item.size}
                q={item.q}
                _id={_id}
              />
            ))}
          </div>
          <div>Total: Rs.23,000</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
