type Props = {
  productName: string;
  cover: string;
  price: number;
};

function CartItem({ productName, cover, price }: Props) {
  return (
    <div className="flex items-center text-black hover:text-white hover:bg-black p-2 duration-300">
      <div className="flex gap-2 w-40 items-center">
        <img src={cover} className="h-24" alt="" />
        <div className="flex flex-col gap-3">
          <span>{productName}</span>
          <span>Rs.{price}</span>
        </div>
      </div>
      <div>X</div>
    </div>
  );
}

export default CartItem;
