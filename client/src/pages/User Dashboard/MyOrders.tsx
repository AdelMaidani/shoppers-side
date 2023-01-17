import UserNav from "../../components/UserNav";
import Img from "../../assets/Covers/Men.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

type order = {
  product: {
    id: string;
    sizes: { size: String; q: Number }[];
  }[];
  userId: string;
  date: string;
  totalValue: number;
  status: string;
  country: string;
  city: string;
  street1: string;
  street2: string;
  pincode: string;
  shippingMethod: string;
  cardNumber: string;
  nameOnCard: string;
  countryOnCard: string;
  trackingNumber: string;
  _id: string;
}[];

const MyOrders = () => {
  const { customerData } = useUser();
  const [orders, setOrders] = useState<order>();

  useEffect(() => {
    if (customerData?._id !== undefined) {
      axios({
        method: "Post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:5000/api/orders/userAllOrders",
        withCredentials: true,
        data: { userId: customerData?._id },
      })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [customerData?._id]);

  return (
    <div className="p-10 bg-white flex flex-col gap-10 text-black">
      <UserNav />
      <div>
        <div className="bg-white font-extrabold text-black text-lg flex items-center justify-around gap-10 p-10 h-20 border border-black">
          <span className="w-20">Date</span>
          <span className="w-10">ID</span>
          <span className="w-32">Total value</span>
          <span className="w-32">Status</span>
        </div>
      </div>

      {orders?.map((order) => (
        <Link
          to={`/dashboard/myOrder/${order._id}`}
          className="border border-gray-300 duration-500 hover:bg-gray-300 text-black flex items-center justify-around gap-10 p-10 h-20"
        >
          <span className="w-20">{order.date.split("T")[0]}</span>
          <span className="w-10">{order._id.split("", 6)}</span>
          <span className="w-32">Rs. {order.totalValue}</span>
          <span className="w-32">{order.status}</span>
        </Link>
      ))}
    </div>
  );
};

export default MyOrders;
