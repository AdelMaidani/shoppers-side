import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  order: {
    product: {
      id: string;
      sizes: string;
    }[];
    userId: string;
    date: string;
    address: string;
    _id: string;
    totalValue: number;
    status: string;
  };
};

type Customer = {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    _id: string;
  };
};

const OrdersCard = (order: Props) => {
  const [customer, setCustomer] = useState<Customer["customer"]>();

  useEffect(() => {
    axios({
      method: "Post",
      url: "http://localhost:5000/api/customer/data",
      data: { customerId: order.order.userId },
      headers: { "Conconsoletent-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => setCustomer(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to={`/dashboard/order/}`} className="bg-gray-100">
      <div className="hidden sm:flex text-xs hover:bg-gray-200 duration-500 justify-around gap-10 p-10 text-black">
        <span className="w-10">{order.order._id.split("", 6)}</span>
        <span className="w-20">{order.order.date.split("T")[0]}</span>
        <span className="w-32">{customer?.firstName}</span>
        <span className="w-32">{order.order.totalValue}</span>
        <span className="text-green-600 w-32">{order.order.status}</span>
      </div>
      <hr />
      <div className="flex flex-col gap-5 sm:hidden">
        <div className="border rounded-lg grid grid-cols-2 p-3 text-xs">
          <div className="flex text-xs flex-col font-bold">
            <span className="w-10">Order ID:</span>
            <span className="w-32">Date:</span>
            <span className="w-32">Customer Name:</span>
            <span className="w-32">Product Name:</span>
            <span className="w-32">Status:</span>
          </div>
          <div className="flex text-xs flex-col">
            <span className="w-10">{order.order._id.split("", 6)}</span>
            <span className="w-32">{order.order.date.split("T")[0]}</span>
            <span className="w-32">{customer?.firstName}</span>
            <span className="w-32">{order.order.totalValue}</span>
            <span className="text-green-600 w-32">{order.order.status}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrdersCard;
