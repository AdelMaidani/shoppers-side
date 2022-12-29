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
      <div className="flex text-xs hover:bg-gray-200 duration-500 justify-around gap-10 p-10 text-black">
        <span className="w-10">{order.order._id.split("", 6)}</span>
        <span className="w-20">{order.order.date.split("T")[0]}</span>
        <span className="w-32">{customer?.firstName}</span>
        <span className="w-32">{order.order.totalValue}</span>
        <span className="w-32">{order.order.status}</span>
      </div>
      <hr />
    </Link>
  );
};

export default OrdersCard;
