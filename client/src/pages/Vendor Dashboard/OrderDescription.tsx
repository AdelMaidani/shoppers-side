import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import VendorOrderCard from "../../components/VendorOrderCard";

type order = {
  address: string;
  date: any;
  product: { _id: string; id: string; size: { size: string; q: number }[] }[];
  status: string;
  totalValue: number;
  userId: string;
  _id: string;
};

type customer = {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
};

const OrderDescription = () => {
  const id = useParams();
  const [orderInfo, setOrderInfo] = useState<order>();
  const [customer, setCustomer] = useState<customer>();
  const [view, setView] = useState("Order");

  useEffect(() => {
    axios({
      method: "Post",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/orders/getCustomOrder",
      data: { id: id.id },
    })
      .then((res) => setOrderInfo(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios({
      method: "Post",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/customer/data",
      data: { customerId: orderInfo?.userId },
    })
      .then((res) => setCustomer(res.data[0]))
      .catch((err) => console.log(err));
  }, [orderInfo]);

  const SS = () => {
    if (view === "Order") {
      return (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-10">
            <span className="text-lg gap-3">Ordered Items</span>
            <div className="flex flex-col">
              <div className="bg-black hidden sm:flex items-center justify-around gap-10 p-10 text-white h-20">
                <span className="w-32">Id</span>
                <span className="w-32">Product</span>
                <span className="w-32">Item Status</span>
                <span className="w-32">Price</span>
                <span className="w-32">Size</span>
                <span className="w-32">Quantity</span>
                <span className="w-32">Total</span>
              </div>
              <div className="flex flex-col gap-10 sm:gap-0 max-w-82 ">
                {orderInfo?.product.map((item) => (
                  <VendorOrderCard id={item.id} items={orderInfo.product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (view === "Shipments") {
      return (
        <div className="text-center flex flex-col items-center justify-center">
          <div className="flex flex-col gap-3">
            <div className="text-lg font-medium">Shipping Address</div>
            <span>{orderInfo?.address}</span>
            <span>.................</span>
            <span>.................</span>
            <span>.................</span>
          </div>
          <div className="flex pt-10 flex-col gap-5">
            <div className="text-lg font-medium">Status</div>
            <div className="flex gap-10">
              <button className="p-3 border-black border hover:bg-black hover:text-white duration-500 ">
                Proccesing
              </button>
              <button className="p-3 border-black border hover:bg-black hover:text-white duration-500 ">
                Packing
              </button>
              <button className="p-3 border-black border hover:bg-black hover:text-white duration-500 ">
                Shipped
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-10">
      <div className="flex flex-col gap-7 items-center">
        <span className="text-lg font-bold">
          Order Id: {orderInfo?._id.split("", 6)}
        </span>
        <div className="flex flex-col gap-10 sm:flex-row justify-center w-full p-10 border-y">
          <div className="flex flex-col gap-4">
            <span className="underline underline-offset-2 font-bold">
              Order Information
            </span>
            <>Order Date : {orderInfo?.date.split("T")[0]}</>
            <div>
              <span>Order Status :</span> <span> {orderInfo?.status}</span>
            </div>
            <div>
              <span>Shipping charge :</span> <span> Rs. 400</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="underline underline-offset-2 font-bold">
              Account Information
            </span>
            <div>
              <span> Customer name:</span>{" "}
              <span>
                {customer?.firstName} {customer?.lastName}
              </span>
            </div>
            <div>
              <span>Email :</span> <span>{customer?.email}</span>
            </div>
            <div>
              <span>Shipping method :</span> <span>""</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 text-lg font-bold pt-4 pb-4 justify-center">
        <div
          onClick={() => setView("Order")}
          className={` underline-offset-4 cursor-pointer ${
            view === "Order" ? "underline" : ""
          }  "underline-offset-2"`}
        >
          Order
        </div>
        <div
          className={` underline-offset-4 cursor-pointer ${
            view === "Shipments" ? "underline" : ""
          }  `}
          onClick={() => setView("Shipments")}
        >
          Shipments
        </div>
      </div>
      <div>{SS()}</div>
    </div>
  );
};

export default OrderDescription;
