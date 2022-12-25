import { Product } from "../interfaces/ProductInterface";
import { useCart } from "../contexts/CartContext";

type Props = {
  active: boolean;
  cartItem: Product;
};

const CartItemDropDown = ({ active, cartItem }: Props) => {
  const { cart } = useCart();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const totalQuantity: number[] = [];

  cart
    .find((items) => items.id === cartItem._id)
    ?.sizes.map((size) => {
      totalQuantity.push(size.q);
    });

  return (
    <div
      className={classNames(
        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
        "block px-4 py-2 text-xs flex gap-5 items-center justify-between"
      )}
    >
      <div className="flex gap-5 items-center">
        <div className="bg-black w-20 h-26">
          <img
            src={cartItem.coverPhoto}
            alt="Product"
            className="w-20 h-26 object-"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="truncate font-bold">{cartItem.productName}</p>
          {cart
            .find((item) => item.id === cartItem._id)
            ?.sizes.map((size) => (
              <div className="flex justify-between items-center gap-1">
                <div className="flex gap-2">
                  <p>{size.size}</p>
                  <div className="flex gap-1">
                    <p>x</p>
                    <p>{size.q}</p>
                  </div>
                </div>
              </div>
            ))}

          <p>Rs. {cartItem.price}</p>

          <div className="font-bold">
            Total:{" "}
            {cartItem.price *
              totalQuantity.reduce((partialSum, a) => partialSum + a, 0)}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemDropDown;
