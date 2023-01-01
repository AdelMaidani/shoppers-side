import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  items: any;
};

type product = {
  category: string;
  coverPhoto: string;
  date: string;
  description: string;
  images: string;
  price: 2800;
  productName: "Oversized cotton T-shirt";
  size: string;
  subCategory: "T-Shirts";
  _id: string;
};

type size = {
  size: string;
  q: number;
  id: string;
}[];

function VendorOrderCard({ id, items }: Props) {
  const [productInfo, setProductInfo] = useState<product>();
  const [sizes, setSizes] = useState<size>([]);

  useEffect(() => {
    axios({
      method: "Post",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/vendor/getProductById",
      data: { id: id },
    })
      .then((res) => setProductInfo(res.data[0]))
      .catch((err) => console.log(err));

    setSizes(items.find((item: any) => item.id === id).sizes);
  }, [items]);

  return (
    <div className="flex flex-col gap-10 sm:gap-0 max-w-82">
      {sizes.map((item: any) => (
        <div className="hidden sm:flex items-center justify-around gap-10 p-10 h-32 hover:bg-gray-200">
          <span className="w-32">{productInfo?._id.split("", 6)}</span>
          <img
            src={productInfo?.coverPhoto}
            className="h-32 object-contain"
            alt=""
          />
          <span className="w-32">Paid</span>
          <span className="w-32">{productInfo?.price}</span>
          <span className="w-32">{item.q}</span>
          <span className="w-32">{item.size}</span>
          <span className="w-32">{`${
            productInfo?.price ? item.q * productInfo.price : "Price Missing"
          }`}</span>
        </div>
      ))}

      {sizes.map((item: any) => (
        <div className="flex sm:hidden gap-5 w-full item-center justify-center border h-60 p-5 hover:border-black truncate duration-500">
          <img src={productInfo?.coverPhoto} className="h-52" alt="" />
          <div className="flex flex-col gap-2">
            <span className=" font-bold">Id:</span>
            <span className=" font-bold">Product:</span>
            <span className=" font-bold">Item: Status</span>
            <span className=" font-bold">Price:</span>
            <span className=" font-bold">Size:</span>
            <span className=" font-bold">Quantity:</span>
            <span className=" font-bold border-t pt-3">Total:</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>{productInfo?._id.split("", 6)}</span>
            <span>{productInfo?.productName}</span>
            <span>Paid</span>
            <span>{productInfo?.price}</span>
            <span className="font-extrabold">{item.size}</span>
            <span className="font-extrabold text-green-500">{item.q}</span>
            <span className=" border-t pt-3">{`${
              productInfo?.price ? item.q * productInfo.price : "Price Missing"
            }`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VendorOrderCard;
