import React from "react";
import UserNav from "../../components/UserNav";
import Img from "../../assets/Covers/Men.jpg";

const MyOrders = () => {
  return (
    <div className="p-10 bg-black flex flex-col gap-5 h-screen text-white">
      <UserNav />
      <div className="flex flex-col gap-5 border border-gray-500 p-5 rounded-md">
        <div className="flex justify-around text-xs">
          <div className="flex flex-col gap-5 sm:flex-row">
            <span>Order-1</span>
            <span className="w-32">1 January 2020</span>
          </div>
          <span className="bg-green-300 sm:w-20 p-1 text-center text-black">
            Shipped
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="border rounded-lg flex flex-col gap-5 p-2 w-52 text-xs">
            <div className="flex flex-col h-60 w-full">
              <img src={Img} alt="" className="h-60 rounded-lg object-cover" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span>Purple Jay</span>
              <span>Quantity: 1</span>
            </div>
          </div>
          {/* // */}
          <div className="border rounded-lg flex flex-col gap-5 p-2 w-52 text-xs">
            <div className="flex flex-col h-60 w-full">
              <img src={Img} alt="" className="h-60 rounded-lg object-cover" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span>Purple Jay</span>
              <span>Quantity: 1</span>
            </div>
          </div>
          <div className="border rounded-lg flex flex-col gap-5 p-2 w-52 text-xs">
            <div className="flex flex-col h-60 w-full">
              <img src={Img} alt="" className="h-60 rounded-lg object-cover" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span>Purple Jay</span>
              <span>Quantity: 1</span>
            </div>
          </div>
          {/* // */}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
