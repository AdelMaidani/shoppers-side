import { useState, useEffect, Fragment } from "react";
import logo from "../assets/DS.png";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../assets/Icons/user.png";
import IndiaFlag from "../assets/Icons/india.png";
import cartIcon from "../assets/Icons/cart.png";
import myOrdersIcon from "../assets/Icons/myOrders.png";
import "../utils/LogoutHover.css";
import { useUser } from "../contexts/UserContext";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { iProducts } from "../interfaces/ProductInterface";
import { useCart } from "../contexts/CartContext";
import CartItemDropDown from "./CartItemDropDown";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<iProducts["products"]>([]);
  const { customerData, userType, setUser } = useUser();
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
    }
  }, [cart]);

  const Logout = () => {
    axios({
      method: "Get",
      url: "http://localhost:5000/api/customer/logout",
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

  function adel() {
    console.log(
      cart.filter((index) => {
        return index.id === "6360ab575a45bf8a527612a6";
      })
    );
  }
  adel();

  return (
    <div className="relative">
      <div className="check bg-black flex justify-between pl-5 pr-5 w-full text-white text-xs items-center">
        <div className="hidden sm:flex items-center w-20 gap-2">
          <img className="h-5" src={IndiaFlag} alt="" />
          <span>India</span>
        </div>
        <Link to={"/"}>
          <img src={logo} className="h-24 object-cover w-20" alt="logo" />
        </Link>
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {cartItems.map((cartItem) => (
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <CartItemDropDown
                        active={active}
                        cartItem={cartItem}
                        cart={cart}
                      />
                    )}
                  </Menu.Item>
                </div>
              ))}
              <div>
                <Menu.Item>
                  <div className="flex gap-3 bg-gray-100 text-gray-900 block px-4 py-2 text-xs">
                    <div>Total:</div>
                    <div>Rs. 2,300</div>
                  </div>
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-xs"
                      )}
                    >
                      Check Out
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
