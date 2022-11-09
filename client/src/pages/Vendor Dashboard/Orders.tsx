import React from "react";
import { Link } from "react-router-dom";
import DashNav from "../../components/VendorNav";

const Orders = () => {
  return (
    <div className="p-10 flex gap-10 w-full flex-col">
      <DashNav />
      <div className="hidden flex-col sm:flex">
        <div className="bg-black flex items-center justify-around gap-10 p-10 text-white h-20">
          <span className="w-10">ID</span>
          <span className="w-32">Date</span>
          <span className="w-32">Customer Name</span>
          <span className="w-32">Product Name</span>
          <span className="w-32">Status</span>
        </div>
        <Link to={"/dashboard/order/:id"} className="bg-gray-100">
          <div className="flex hover:bg-gray-200 duration-500 justify-around gap-10 p-10 text-black">
            <span className="w-10">2</span>
            <span className="w-32">1/12/23</span>
            <span className="w-32">Mohammed Adel</span>
            <span className="w-32">SJJS</span>
            <span className="w-32">Status</span>
          </div>
          <hr />
        </Link>
        <Link to={"/dashboard/order/:id"} className="bg-gray-100">
          <div className="flex hover:bg-gray-200 duration-500 justify-around gap-10 p-10 text-black">
            <span className="w-10">2</span>
            <span className="w-32">1/12/23</span>
            <span className="w-32">Mohammed Adel</span>
            <span className="w-32">SJJS</span>
            <span className="w-32">Status</span>
          </div>
          <hr />
        </Link>
      </div>
      <div className="flex flex-col gap-5 sm:hidden">
        <div className="border rounded-lg grid grid-cols-2 p-3 text-xs">
          <div className="flex flex-col font-bold">
            <span className="w-10">ID:</span>
            <span className="w-32">Date:</span>
            <span className="w-32">Customer Name:</span>
            <span className="w-32">Product Name:</span>
            <span className="w-32">Status:</span>
          </div>
          <div className="flex flex-col">
            <span className="w-10">2</span>
            <span className="w-32">1/12/23</span>
            <span className="w-32">Mohammed Adel</span>
            <span className="w-32">SJJS</span>
            <span className="w-32">Status</span>
          </div>
        </div>
        <div className="border rounded-lg grid grid-cols-2 p-3 text-xs">
          <div className="flex flex-col font-bold">
            <span className="w-10">ID:</span>
            <span className="w-32">Date:</span>
            <span className="w-32">Customer Name:</span>
            <span className="w-32">Product Name:</span>
            <span className="w-32">Status:</span>
          </div>
          <div className="flex flex-col">
            <span className="w-10">2</span>
            <span className="w-32">1/12/23</span>
            <span className="w-32">Mohammed Adel</span>
            <span className="w-32">SJJS</span>
            <span className="w-32">Status</span>
          </div>
        </div>
        <div className="border rounded-lg grid grid-cols-2 p-3 text-xs">
          <div className="flex flex-col font-bold">
            <span className="w-10">ID:</span>
            <span className="w-32">Date:</span>
            <span className="w-32">Customer Name:</span>
            <span className="w-32">Product Name:</span>
            <span className="w-32">Status:</span>
          </div>
          <div className="flex flex-col">
            <span className="w-10">2</span>
            <span className="w-32">1/12/23</span>
            <span className="w-32">Mohammed Adel</span>
            <span className="w-32">SJJS</span>
            <span className="w-32">Status</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
