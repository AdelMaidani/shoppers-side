import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  _id: String;
  date: Date;
  coverPhoto: string;
  productName: String;
  size: {
    q: string;
    size: string;
    sold: number;
  }[];
};

const MyProductCard = (product: Props) => {
  const [sold, setSold] = useState<number>(0);
  const [totalQuantityLeft, setTotalQuantityLeft] = useState<number>();

  useEffect(() => {
    // Sold
    const totalSold = [] as any;
    product.size?.forEach((i) => {
      totalSold.push(i.sold);
    });
    setSold(totalSold.reduce((partialSum: any, a: any) => partialSum + a, 0));

    // Left Quantity
    const itemLeft = [] as any;
    product.size?.forEach((i) => {
      itemLeft.push(i.q);
    });
    setTotalQuantityLeft(
      itemLeft.reduce((partialSum: any, a: any) => partialSum + a, 0)
    );
  }, [product]);

  return (
    <div className="w-full sm:text-center">
      <Link
        to={`/dashboard/product/${product._id}`}
        className="hidden sm:flex bg-gray-100 h-28"
      >
        <div className="flex hover:bg-gray-200 w-full text-xs items-center duration-500 justify-around p-10 text-black">
          <span className="w-20">{product._id.slice(0, 6)}</span>
          <span className="w-20">{product.date.toString().split("T")[0]}</span>
          <span className="w-32">
            <img
              src={product.coverPhoto}
              className="h-28 object-cover w-full"
              alt=""
            />
          </span>
          <span className="w-32">{product.productName}</span>
          <span className="w-32">{totalQuantityLeft}</span>
          <span className="w-20">{sold}</span>
        </div>
        <hr />
      </Link>

      <Link
        to={`/dashboard/product/${product._id}`}
        className="sm:hidden border rounded-lg grid grid-cols-2 gap-10 p-2 text-xs"
      >
        <div className="flex flex-col h-40">
          <img src={product.coverPhoto} alt="" className="h-40 object-cover" />
        </div>
        <div className="flex flex-col justify-around">
          <span className="w-32">{product._id.slice(0, 6)}</span>
          <span className="w-32">{product.productName}</span>
          <span className="w-32 flex gap-2">
            <p className="font-bold">Total Left:</p>
            {totalQuantityLeft}
          </span>
          <span className="w-32 flex gap-2">
            <p className="font-bold">Sold:</p> {sold}
          </span>
          <span className="w-32">{product.date.toString().split("T")[0]}</span>
        </div>
      </Link>
    </div>
  );
};

export default MyProductCard;
