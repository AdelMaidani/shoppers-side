import React from "react";

const OrderDescription = () => {
  return (
    <div className="p-10">
      <div className="flex gap-10 ">
        <div className="h-72 bg-black w-72"></div>
        <div className="flex flex-col justify-around">
          <div className="font-bold">Id:</div>
          <div className="font-bold">Customer Name: </div>
          <div className="font-bold">Product Name: </div>
          <div className="font-bold">Size: </div>
          <div className="font-bold">Price: </div>
          <div className="font-bold">Address: </div>
          <div className="font-bold">Status:</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDescription;
