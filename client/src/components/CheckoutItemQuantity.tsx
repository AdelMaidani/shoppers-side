import { useCart } from "../contexts/CartContext";

type Props = {
  size: string;
  _id: string;
  q: number;
  increaseQuantity: Function;
};

function CheckoutItemQuantity({ size, _id, q, increaseQuantity }: Props) {
  const { DecreaseCartQuantity } = useCart();

  return (
    <div className="flex justify-between gap-5">
      <div className="w-20">{size}</div>
      <div className="flex gap-3 items-center w-20">
        <div
          onClick={() => increaseQuantity(_id, size)}
          className="cursor-pointer font-semibold w-1/2 text-xl hover:font-extrabold duration-400 text-green-200"
        >
          +
        </div>
        <div className="w-1/2">{q}</div>
        <div
          onClick={() => DecreaseCartQuantity(_id, size)}
          className="cursor-pointer font-semibold w-1/2 text-xl hover:font-extrabold duration-400 text-red-400"
        >
          -
        </div>
      </div>
    </div>
  );
}

export default CheckoutItemQuantity;
