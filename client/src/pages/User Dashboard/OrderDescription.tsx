import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNav from "../../components/UserNav";
import VendorOrderCard from "../../components/VendorOrderCard";

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
};

function MyOrderDescription() {
  const id = useParams();
  const [order, setOrder] = useState<order>();

  useEffect(() => {
    axios({
      method: "Post",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/orders/getCustomOrder",
      withCredentials: true,
      data: { id: id.id },
    })
      .then((res) => {
        setOrder(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-10 bg-white flex flex-col gap-10 text-black">
      <UserNav />
      <div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Order Id :</span>
          <span className="w-full">{order?._id.split("", 6)}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Date :</span>
          <span className="w-full">{order?.date.split("T")[0]}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">totalValue :</span>
          <span className="w-full">{order?.totalValue}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Status :</span>
          <span className="w-full">{order?.status}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Country :</span>
          <span className="w-full">{order?.country}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">City :</span>
          <span className="w-full">{order?.city}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Street 1 :</span>
          <span className="w-full">{order?.street1}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Street 2 :</span>
          <span className="w-full">{order?.street2}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Pincode :</span>
          <span className="w-full">{order?.pincode}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Shipping Method :</span>
          <span className="w-full">{order?.shippingMethod}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg w-52">Tracking Number :</span>
          <span className="w-full">{order?.trackingNumber}</span>
        </div>
      </div>
      <div>
        <div className="flex bg-black text-white flex-col gap-10 sm:gap-0 max-w-82 ">
          <div className="bg-black text-white hidden sm:flex items-center justify-around gap-10 p-10 text-black h-20">
            <span className="w-32">Id</span>
            <span className="w-32">Product</span>
            <span className="w-32">Name</span>
            <span className="w-32">Price</span>
            <span className="w-32">Size</span>
            <span className="w-32">Quantity</span>
            <span className="w-32">Total</span>
          </div>
          {order?.product.map((item) => (
            <VendorOrderCard id={item.id} items={order.product} />
          ))}
        </div>
        <div className="bg-white hidden text-black sm:flex items-center justify-around gap-10 p-5">
          <span className="w-32"></span>
          <span className="w-32"></span>
          <span className="w-32"></span>
          <span className="w-32"></span>
          <span className="w-32"></span>
          <span className="w-32">Grand Total :</span>
          <span className="w-32">{order?.totalValue}</span>
        </div>
      </div>
    </div>
  );
}

export default MyOrderDescription;
