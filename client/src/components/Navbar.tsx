import { useState, useEffect, Fragment } from "react";
import logo from "../assets/DS.png";
import { Link, useNavigate } from "react-router-dom";
import IndiaFlag from "../assets/Icons/india.png";
import "../utils/LogoutHover.css";
import userIcon from "../assets/Icons/user.png";
import { useUser } from "../contexts/UserContext";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { iProducts } from "../interfaces/ProductInterface";
import { useCart } from "../contexts/CartContext";
import CartItemDropDown from "./CartItemDropDown";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<iProducts["products"]>([]);
  const [emptyCart, setEmptyCart] = useState(true);
  const { userType, setUser } = useUser();
  const { cart } = useCart();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

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
      setEmptyCart(false);
    }
  }, [cart]);

  const LogoutVendor = () => {
    axios({
      method: "Get",
      url: "http://localhost:5000/api/vendor/logout",
      withCredentials: true,
    })
      .then((res) => {
        navigate("/");
        setUser("Null");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const total: number[] = [];

  cart.map((item) => {
    const one = cartItems.find((product) => item.id === product._id);

    if (one) {
      item.sizes.map((size) => total.push(size.q * one.price));
    }
  });

  return (
    <div className="relative">
      <div className="check bg-black flex justify-between pl-5 pr-5 w-full text-white text-xs items-center">
        <div className="hidden sm:flex items-center w-20 gap-10">
          <img className="h-5" src={IndiaFlag} alt="" />
          <span>India</span>
        </div>
        <Link to={"/"} className="flex items-center">
          <img src={logo} className="h-24 object-cover" alt="logo" />
        </Link>
        <div
          className={`flex gap-10 items-center ${
            userType === "Vendor" ? "block" : "hidden"
          }`}
        >
          <Link to={"/dashboard/webpage"} className="flex item-center gap-3">
            <img src={userIcon} className="h-4" alt="usericon" />
            <span>Vendor</span>
          </Link>
          <button
            onClick={() => LogoutVendor()}
            className="border p-3 rounded-lg hover:text-black hover:bg-white duration-500"
          >
            Logout
          </button>
        </div>
        <div
          className={`flex items-center gap-10 ${
            userType === "Vendor" ? "hidden" : "block"
          }`}
        >
          <Link to={"/login"}>Login</Link>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="text-xs inline-flex w-full justify-center rounded-md border border-gray-300 bg-black px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-offset-gray-100">
                Cart
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="w-80 absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {cartItems.map((cartItem) => (
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <CartItemDropDown active={active} cartItem={cartItem} />
                      )}
                    </Menu.Item>
                  </div>
                ))}
                <div className={`${emptyCart ? "hidden" : "block"}`}>
                  <Menu.Item>
                    <div className="flex justify-between font-extrabold gap-3 bg-gray-100 text-gray-900 block px-4 py-2 text-xs">
                      <div>Grand Total:</div>
                      <div>
                        Rs. {total.reduce((partialSum, a) => partialSum + a, 0)}
                      </div>
                    </div>
                  </Menu.Item>
                </div>
                <div
                  className={` p-2 flex justify-between  ${
                    emptyCart ? "hidden" : "block"
                  }`}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-xs"
                        )}
                      >
                        Edit cart
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={"/checkout"}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-xs"
                        )}
                      >
                        Check out
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className={` py-1 ${emptyCart ? "block" : "hidden"}`}>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-xs"
                        )}
                      >
                        No items in cart .
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
