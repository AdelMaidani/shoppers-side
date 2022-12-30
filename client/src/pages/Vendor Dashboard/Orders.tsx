import axios from "axios";
import { useEffect, useState } from "react";
import OrdersCard from "../../components/OrdersCard";
import DashNav from "../../components/VendorNav";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios({
      method: "Get",
      url: "http://localhost:5000/api/orders/getOrders",
    })
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-10 flex gap-10 w-full flex-col">
      <DashNav />
      <div>
        <div className="bg-black hidden sm:flex items-center justify-around gap-10 p-10 text-white h-20">
          <span className="w-10">Order ID</span>
          <span className="w-20">Date</span>
          <span className="w-32">Customer Name</span>
          <span className="w-32">Total value</span>
          <span className="w-32">Status</span>
        </div>
        {orders.map((order) => (
          <OrdersCard order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
