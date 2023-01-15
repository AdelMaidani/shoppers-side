import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";

type Props = {
  size: string;
  _id: string;
  q: number;
  sizes: any;
};

function CheckoutItemQuantity({ size, _id, q, sizes }: Props) {
  const { DecreaseCartQuantity, IncreaseCartQuantity, cart } = useCart();
  const [noMoreLeft, setNoMoreLeft] = useState(false);

  const totalQ = parseInt(sizes.find((si: any) => si.size === size).q);

  useEffect(() => {
    if (totalQ === q) {
      setNoMoreLeft(true);
    } else {
      setNoMoreLeft(false);
    }
  }, [q]);

  return (
    <div className="flex justify-between w-52 items-center">
      <div className="">{size} :</div>
      <div className="flex items-center justify-center">
        <div className="w-8">
          <div
            onClick={() => IncreaseCartQuantity(_id, size)}
            className={`cursor-pointer font-semibold text-xl hover:font-extrabold duration-400 text-green-200 ${
              noMoreLeft ? "hidden" : "block"
            }`}
          >
            +
          </div>
        </div>
        <div className="w-8">{q}</div>
        <div className="w-8">
          <div
            onClick={() => DecreaseCartQuantity(_id, size)}
            className="cursor-pointer font-semibold text-xl hover:font-extrabold duration-400 text-red-400"
          >
            -
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItemQuantity;
