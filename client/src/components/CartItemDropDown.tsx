import React from "react";
import { iProducts } from "../interfaces/ProductInterface";

type Props = {
  active: boolean;
  cartItem: any;
  cart: any;
};

const CartItemDropDown = ({ active, cartItem, cart }: Props) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div
      className={classNames(
        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
        "block px-4 py-2 text-xs flex gap-5 items-center justify-between"
      )}
    >
      <div className="flex gap-5 items-center">
        <div className="bg-black w-18">
          <img
            src={cartItem.coverPhoto}
            alt="Product picture"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>{cartItem.productName}</p>
          {cart
            .filter((index: any) => {
              return index.id === cartItem._id;
            })
            .map((size: any) => (
              <div className="flex justify-between items-center gap-1">
                <div className="flex gap-2">
                  <p>{size.size}</p>
                  <div className="flex gap-1">
                    <p>x</p>
                    <p>{size.q}</p>
                  </div>
                </div>
                <button className="border h-4 w-4 border-black bg-black text-white hover:text-black hover:bg-white duration-300">
                  X
                </button>
              </div>
            ))}

          <p>Rs. {cartItem.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemDropDown;
