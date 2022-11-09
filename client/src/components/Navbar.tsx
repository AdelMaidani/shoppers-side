import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../assets/Icons/user.png";
import IndiaFlag from "../assets/Icons/india.png";
import cartIcon from "../assets/Icons/cart.png";
import myOrdersIcon from "../assets/Icons/myOrders.png";
import "../utils/LogoutHover.css";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { iProducts } from "../interfaces/ProductInterface";
import CartItem from "./CartItem";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<iProducts["products"]>([]);
  const { customerData, userType, setUser } = useUser();
  const { cart } = useCart();

  useEffect(() => {
    if (cart.length > 0) {
      const Ids = [] as any;

      var one = new Promise<void>((resolve, reject) => {
        cart.forEach((value, index, array) => {
          Ids.push(value.id);
          if (index === array.length - 1) {
            resolve();
            console.log("1111");
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

  return (
    <div className="relative">
      <div className="check bg-black flex h-24 justify-between text-white w-full pr-5 pl-5 text-xs items-center">
        <div className="hidden sm:flex items-center gap-2">
          <img className="h-5" src={IndiaFlag} alt="" />
          <span>India</span>
        </div>
        <Link to={"/"}>
          <img src={logo} className="h-24 object-cover w-20" alt="logo" />
        </Link>
        <div className="flex items-center gap-5">
          {/* Cart */}
          <Menu as="div" className="flex relative z-20 flex-col">
            <Menu.Button className="flex items-center gap-2 w-24 justify-center">
              <img src={cartIcon} alt="Icon" className="h-5" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute flex flex-col gap-2 p-1 w-48 bg-white border top-5 items-center text-white">
                <span className="text-black underline underline-offset-4">
                  Cart
                </span>
                {cartItems.map((item) => (
                  <Menu.Item>
                    <CartItem
                      productName={item.productName}
                      cover={item.coverPhoto}
                      price={item.price}
                    />
                  </Menu.Item>
                ))}
                <span className="cursor-pointer text-black border border-black hover:text-white hover:bg-black duration-300 p-1 ">
                  Check Out
                </span>
              </Menu.Items>
            </Transition>
          </Menu>
          {userType === "Customer" ? (
            <Menu as="div" className="flex relative z-20 flex-col">
              <Menu.Button className="flex items-center gap-2 w-24 justify-center">
                <img src={userIcon} alt="Icon" className="h-5" />
                {customerData?.firstName}
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute w-24 top-5 items-center h-12 text-black">
                  <Menu.Item>
                    <Link
                      to={"/dashboard/myorders"}
                      className="w-full flex items-center duration-300 justify-center bg-gray-200 hover:bg-gray-300 h-full"
                    >
                      <img src={myOrdersIcon} className="h-6" alt="" />
                      My orders
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={Logout}
                      className="w-full bg-gray-200 hover:bg-red-200 text-red-600 duration-300 h-full"
                    >
                      Logout
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : userType === "Vendor" ? (
            <Menu as="div" className="flex relative z-20 flex-col">
              <Menu.Button className="flex items-center gap-2 w-24 justify-center">
                <img src={userIcon} alt="Icon" className="h-5" />
                Vendor
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute w-24 top-5 items-center h-12 text-black">
                  <Menu.Item>
                    <Link
                      to={"/dashboard/addproduct"}
                      className="w-full flex items-center duration-300 justify-center bg-gray-200 hover:bg-gray-300 h-full"
                    >
                      Add products
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to={"/dashboard/orders"}
                      className="w-full flex items-center duration-300 justify-center bg-gray-200 hover:bg-gray-300 h-full"
                    >
                      Orders
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to={"/dashboard/products"}
                      className="w-full flex items-center duration-300 justify-center bg-gray-200 hover:bg-gray-300 h-full"
                    >
                      Products
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      onClick={Logout}
                      className="w-full bg-gray-200 hover:bg-red-200 text-red-600 duration-300 h-full"
                    >
                      Logout
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center gap-2 w-24 justify-center"
            >
              <img src={userIcon} alt="Icon" className="h-5" />
            </Link>
          )}
        </div>
      </div>
      {/* <div className="flex flex-col items-center absolute z-30 bg-black flex flex-col gap-2 p-5 text-white border border-white">
        {cartItems.map((item) => (
          <CartItem
            productName={item.productName}
            cover={item.coverPhoto}
            price={item.price}
          />
        ))}
        <div>
          <button className="border border-white p-1">Check Out</button>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
