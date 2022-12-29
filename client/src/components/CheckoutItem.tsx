import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import CheckoutItemQuantity from "./CheckoutItemQuantity";

type sizes = {
  size: string;
  q: string;
};

type product = {
  coverPhoto: string;
  productName: string;
  category: string;
  subCategory: string;
  _id: string;
  price: number;
  sizes: Array<sizes>;
};

const CheckoutItem = ({
  coverPhoto,
  productName,
  category,
  subCategory,
  _id,
  price,
  sizes,
}: product) => {
  const { cart } = useCart();

  const item = cart.find((item) => item.id === _id);

  const totalQuantity: number[] = [];

  cart
    .find((items) => items.id === _id)
    ?.sizes.map((size) => {
      totalQuantity.push(size.q);
    });

  return (
    <div>
      <div className="flex flex-col gap-10 lg:flex-row justify-between border-b border-gray-500 pb-3">
        <div className="flex gap-5 justify-between">
          {" "}
          {/* Product Picture */}
          <img
            src={coverPhoto}
            className="h-40 lg:w-1/2 object-cover"
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
            {item?.sizes.map((item) => (
              <CheckoutItemQuantity
                size={item.size}
                q={item.q}
                _id={_id}
                sizes={sizes}
              />
            ))}
          </div>
          <div className="flex gap-3 lg:justify-between">
            <span className="font-bold">Total :</span>
            <span className="">
              Rs.
              {price *
                totalQuantity.reduce((partialSum, a) => partialSum + a, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
