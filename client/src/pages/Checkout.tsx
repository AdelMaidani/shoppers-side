import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutItem from "../components/CheckoutItem";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { iProducts } from "../interfaces/ProductInterface";
import gpayLogo from "../assets/Icons/gpay.png";
import mobikwikLogo from "../assets/Icons/MobiKwik.png";
import phonePeLogo from "../assets/Icons/PhonePe.png";
import Login from "../components/Login";
import CreateAccoiunt from "../components/CreateAccoiunt";
import { useFormik } from "formik";
import * as Yup from "yup";

function Checkout() {
  const { cart } = useCart();
  const { userType, customerData } = useUser();
  const [cartItems, setCartItems] = useState<iProducts["products"]>([]);
  const [itemTotals, setItemTotals] = useState<number>(0);
  const [switchLogin, setSwitchLogin] = useState("login");
  const [placing, setPlacing] = useState<boolean>(false);

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

    if (userType !== "Null") {
      setSwitchLogin("Login");
    }
  }, [cart]);

  useEffect(() => {
    const total: number[] = [];

    cart.map((item) => {
      const one = cartItems.find((product) => item.id === product._id);

      if (one) {
        item.sizes.map((size) => total.push(size.q * one.price));
      }
    });

    setItemTotals(total.reduce((partialSum, a) => partialSum + a, 0));
  }, [cart, cartItems]);

  const formik = useFormik({
    initialValues: {
      product: cart,
      userId: customerData?._id,
      totalValue: 0,
      status: "Take Action",
      country: "",
      city: "",
      street1: "",
      street2: "",
      pincode: null,
      shippingMethod: "",
      cardNumber: null,
      nameOnCard: "",
      countryOnCard: "",
    },
    validationSchema: Yup.object({
      country: Yup.string()
        .min(3, "Enter valid country")
        .max(10, "Enter valid country")
        .required("Required"),
      city: Yup.string()
        .min(3, "Enter valid city")
        .max(20, "Enter valid city")
        .required("Required"),
      street1: Yup.string()
        .min(3, "Enter valid street address")
        .max(20, "Enter valid street address")
        .required("Required"),
      street2: Yup.string()
        .min(3, "Enter valid street address")
        .max(20, "Enter valid street address")
        .required("Required"),
      pincode: Yup.number().required("Required"),
      shippingMethod: Yup.string().required("Required"),
      cardNumber: Yup.number().required("Required"),
      nameOnCard: Yup.string()
        .min(5, "Enter Correct name")
        .max(20, "Enter valid name")
        .required("Required"),
      countryOnCard: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setPlacing(true);
      values.userId = customerData?._id;
      values.totalValue = itemTotals;
      console.log(values);
      axios({
        method: "Post",
        url: "http://localhost:5000/api/orders/placeOrder",
        data: values,
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  });

  const SwitchLogin = (status: string) => {
    setSwitchLogin(status);
  };

  return (
    <div className="bg-black min-h-screen max-h-full flex flex-col lg:flex-row gap-10 text-white p-10">
      <div className="lg:w-3/5 flex flex-col gap-10">
        <span className="text-xl font-bold">Cart</span>
        <div className="flex flex-col justify-between gap-5">
          {cart.length == 0 ? <div>Add items to continue payment</div> : ""}
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
          <span> Grand total : Rs. {itemTotals}</span>
        </div>
      </div>

      {/* Not Logged In */}
      <div
        className={`${
          userType === "Null" ? "block" : "hidden"
        } lg:border-l lg:w-2/5 `}
      >
        <div className={`${switchLogin === "login" ? "block" : "hidden"}`}>
          <Login switchLogin={SwitchLogin} />
        </div>
        <div className={`${switchLogin === "signUp" ? "block" : "hidden"}`}>
          <CreateAccoiunt switchLogin={SwitchLogin} />
        </div>
      </div>

      <form
        className={` pl-10 flex flex-col gap-10 items-center lg:w-2/5 border-l border-gray-400 ${
          userType === "Null" ? "hidden" : "block"
        }`}
        onSubmit={formik.handleSubmit}
      >
        {/* Shipping  */}
        <div className="flex flex-col items-center w-full gap-10">
          <span className="text-xl font-bold">Shipping</span>
          <div className="flex w-full gap-10 items-center justify-center">
            <div className="w-12 border-gray-400 border-b"></div>
            <div className="text-xs w-1/2 text-center text-gray-200">
              Fill in your shipping address and options
            </div>
            <div className="w-12 border-gray-400 border-b"></div>
          </div>
          <div className="flex flex-col w-full gap-10">
            <div className="flex flex-col gap-4">
              <div className="text-lg text-gray-300 font-semibold">Country</div>
              <input
                placeholder="Country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="country"
                className="h-10 p-2 w-full border text-black"
                type="text"
              />
              <div className="h-1">
                {formik.touched.country && formik.errors.country ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.country}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-lg text-gray-300 font-semibold">City</div>
              <input
                placeholder="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="city"
                className="h-10 p-2 w-full border text-black"
                type="text"
              />
              <div className="h-1">
                {formik.touched.city && formik.errors.city ? (
                  <p className="text-red-500 text-xs">{formik.errors.city}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-lg text-gray-300 font-semibold">
                Street 1
              </div>
              <div className="flex">
                <input
                  placeholder="street1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="street1"
                  className="h-10 p-2 w-full border text-black"
                  type="text"
                />
              </div>
              <div className="h-1">
                {formik.touched.street1 && formik.errors.street1 ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.street1}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-lg text-gray-300 font-semibold">
                Street 2
              </div>
              <input
                placeholder="street2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="street2"
                className="h-10 p-2 w-full border text-black"
                type="text"
              />
              <div className="h-1">
                {formik.touched.street2 && formik.errors.street2 ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.street2}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col gap-4">
                <div className="text-lg text-gray-300 font-semibold">
                  Pincode
                </div>
                <div className="flex">
                  <input
                    placeholder="pincode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="pincode"
                    className="h-10 p-2 w-full border text-black"
                    type="text"
                  />
                </div>
                <div className="h-1">
                  {formik.touched.pincode && formik.errors.pincode ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.pincode}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-lg text-gray-300 font-semibold">
                  Shipping Method
                </div>
                <div className="flex gap-10 justify-between">
                  <div className="flex gap-2">
                    <input
                      placeholder="Shipping Method"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="radio"
                      name="shippingMethod"
                      id="fastDelivery"
                      value="Fast Delivery"
                    />
                    <label htmlFor="fastDelivery">Fast Delivery</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      placeholder="Shipping Method"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="radio"
                      name="shippingMethod"
                      id="normalDelivery"
                      value="normalDelivery"
                    />
                    <label htmlFor="normalDelivery">Normal Delivery</label>
                  </div>
                </div>
                <div className="h-1">
                  {formik.touched.shippingMethod &&
                  formik.errors.shippingMethod ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.shippingMethod}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Payment */}
        <div className="flex flex-col items-center justify-center w-full gap-10">
          <span className="text-center text-xl w-full font-bold">Payment</span>
          <div className="flex justify-center gap-10 w-full items-center">
            <div className="w-20 bg-gray-200 hover:bg-gray-100 h-10 rounded-lg duration-300 flex items-center">
              <img
                src={gpayLogo}
                className="object-contain h-12 w-full"
                alt=""
              />
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
          <div className="flex w-full gap-10 items-center justify-center">
            <div className="w-12 border-gray-400 border-b"></div>
            <div className="text-xs text-gray-200">
              or pay using debit/credit card
            </div>
            <div className="w-12 border-gray-400 border-b"></div>
          </div>
          <div className="flex flex-col w-full gap-10">
            <div className="flex flex-col gap-4">
              <div className="text-lg text-gray-300 font-semibold">
                Card Number
              </div>
              <div className="flex">
                <input
                  placeholder="cardNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="cardNumber"
                  className="h-10 p-2 w-2/3 border text-black"
                  type="number"
                />
              </div>
              <div className="h-1">
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.cardNumber}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-lg text-gray-300 font-semibold">
                Name on card
              </div>
              <input
                placeholder="Name on card"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="nameOnCard"
                className="h-10 p-2 w-full border text-black"
                type="text"
              />
              <div className="h-1">
                {formik.touched.nameOnCard && formik.errors.nameOnCard ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.nameOnCard}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-lg text-gray-300 font-semibold">
                Country or region
              </div>
              <select
                name="countryOnCard"
                id="countryOnCard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-10 text-black p-2"
              >
                <option value="usa">United States</option>
                <option value="usa">United Kingdom</option>
                <option value="usa">India</option>
              </select>
              <div className="h-1">
                {formik.touched.countryOnCard && formik.errors.countryOnCard ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.countryOnCard}
                  </p>
                ) : null}
              </div>
            </div>
            <div
              className={` "flex items-center flex-col h-10 p-2 w-72 text-white text-center border border-white hover:text-black duration-500" ${
                placing ? "" : "hidden"
              }`}
            >
              <div
                className="inline-block w-4 h-4
          border-t-4 
          border-white  
          rounded-full 
          animate-spin"
              ></div>
            </div>

            <button
              onBlur={formik.handleBlur}
              type="submit"
              name="submit"
              className={` " items-center flex-col h-10 p-2 w-72 text-white text-center border border-white hover:bg-white hover:text-black duration-500" ${
                placing ? "hidden" : ""
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
