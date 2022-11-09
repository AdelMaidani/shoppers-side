import { Link } from "react-router-dom";

type Props = {
  _id: String;
  date: Date;
  coverPhoto: string;
  productName: String;
  price: Number;
  size?: [
    {
      q: string;
      size: string;
    }
  ];
};

const ProductCard = (product: Props) => {
  return (
    <Link to={`/product/${product._id}`} className="flex flex-col gap-2">
      <div className="h-40 sm:h-72 max-w-52 bg-white">
        <img src={product.coverPhoto} className="h-72 object-cover" alt="" />
      </div>
      <div className="flex flex-col">
        <span>{product.productName}</span>
        <div className="flex gap-2">
          <span className="text-gray-300">Rs.</span>
          <span>{product.price.toString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
