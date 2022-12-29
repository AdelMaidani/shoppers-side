import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutItem from "../components/CheckoutItem";
import { useCart } from "../contexts/CartContext";
import { iProducts } from "../interfaces/ProductInterface";
import gpayLogo from "../assets/Icons/gpay.png";
import mobikwikLogo from "../assets/Icons/MobiKwik.png";
import phonePeLogo from "../assets/Icons/PhonePe.png";

function Checkout() {
  const { cart } = useCart();
  const [cartItems, setCartItems] = useState<iProducts["products"]>([]);

  useEffect(() => {
    if (cart.length > 0) {
      const Ids = [] as any;
      var one = new Promise<void>((resolve, reject) => {
        cart.forEach((value, index, array) => {
          Ids.push(value.id);
          if (index === array.length - 1) {
            resolve();
          }
        });
      });
      one.then(() => {
        console.log("send");
        axios({
          method: "Post",
          headers: { "Content-Type": "application/json" },
          url: "http://localhost:5000/api/vendor/getProductByIds",
          data: { Ids },
        })
          .then((res) => {
            setCartItems(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, []);

  const total: number[] = [];

  // cart.map((item) => {
  //   const one = cartItems.find((product) => item.id === product._id);

  //   if (one) {
  //     item.sizes.map((size) => total.push(size.q * one.price));
  //   }
  // });

  const PlaceOrder = () => {
    const data = {
      product: cart,
      userId: "635507093b95913674093318",
      address: "New york , USA",
      status: "Order Received",
      totalValue: 40000,
    };

    console.log(data);
    // axios({
    //   method: "Post",
    //   url: "http://localhost:5000/api/orders/placeOrder",
    //   data: data,
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="bg-black h-full flex flex-col lg:flex-row gap-10 text-white p-10 w-full">
      <div className="lg:w-3/5 flex flex-col gap-10">
        <span className="text-xl font-bold">Cart</span>
        <div className="flex flex-col justify-between gap-5">
          {cartItems.map((item) => (
            <CheckoutItem
              coverPhoto={item.coverPhoto}
              productName={item.productName}
              category={item.category}
              subCategory={item.subCategory}
              _id={item._id}
              sizes={item.size}
              price={item.price}
            />
          ))}
        </div>
        <div className="text-lg font-bold text-right">
          <span> Grand total :</span>{" "}
          <span>Rs.{total.reduce((partialSum, a) => partialSum + a, 0)}</span>
        </div>
      </div>
      <div className="lg:border-l border-gray-500 pl-10 flex flex-col gap-10 items-center lg:w-2/5">
        <span className="text-xl font-bold">Payment</span>
        <div className="flex gap-10 items-center">
          <div className="w-20 bg-gray-200 hover:bg-gray-100 h-10 rounded-lg duration-300 flex items-center">
            <img src={gpayLogo} className="object-contain h-12 w-full" alt="" />
          </div>
          <div className="w-20 bg-gray-200 hover:bg-gray-100 h-10 rounded-lg duration-300 flex items-center">
            <img
              src={mobikwikLogo}
              className="object-contain h-16 w-full"
              alt=""
            />
          </div>
          <div className="w-20 bg-gray-200 hover:bg-gray-100 h-10 rounded-lg duration-300 flex items-center">
            <img
              src={phonePeLogo}
              className="object-contain h-16 w-full"
              alt=""
            />
          </div>
        </div>
        <div className="flex w-full gap-10 items-center">
          <div className="w-1/2 border-gray-400 border-b"></div>
          <div className="text-xs w-1/2 text-gray-200">
            or pay using debit/credit card
          </div>
          <div className="w-1/2 border-gray-400 border-b"></div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="text-lg text-gray-300 font-semibold">
              Card information
            </div>
            <div className="flex">
              <input className="h-10 p-2 w-72 border text-black" type="text" />
              <input className="h-10 p-2 w-20 border text-black" type="text" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-lg text-gray-300 font-semibold">
              Name on card
            </div>
            <input className="h-10 p-2 w-full border text-black" type="text" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-lg text-gray-300 font-semibold">
              Country or region
            </div>
            <select name="" id="" className="h-10 text-black p-2">
              <option value="">United States</option>
              <option value="">United Kingdom</option>
              <option value="">India</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => PlaceOrder()}
              className="border p-2 w-full h-10 hover:bg-white hover:text-black duration-500"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
