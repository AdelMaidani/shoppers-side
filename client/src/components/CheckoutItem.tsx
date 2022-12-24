import { useCart } from "../contexts/CartContext";

type product = {
  coverPhoto: string;
  productName: string;
  category: string;
  subCategory: string;
  _id: string;
};

type sizes = {
  size: string;
  q: number;
};

const CheckoutItem = ({
  coverPhoto,
  productName,
  category,
  subCategory,
  _id,
}: product) => {
  const { cart } = useCart();
  console.log(cart);

  const sizes: sizes[] = [];

  cart.forEach((item) => {
    if (item.id === _id) {
      if (sizes.length > 0) {
        console.log("Not empty");
      } else {
        sizes.push({ size: item.size, q: item.q });
      }
    }
  });

  return (
    <div>
      <div className="flex justify-between gap-5">
        <div className="flex gap-5">
          {" "}
          {/* Product Picture */}
          <img
            src="https://5.imimg.com/data5/VC/PG/MY-7814120/formal-t-shirt-500x500.jpg"
            className="h-40"
            alt="product"
          />
          {/* Product info */}
          <div className="flex flex-col justify-between">
            <span className="font-bold">{productName}</span>
            <div className="flex gap-2">
              <span>Product Id:</span>
              <span>{_id}</span>
            </div>
            <div>
              <div className="flex gap-2">
                <span>Category:</span>
                <span>{category}</span>
              </div>
              <div className="flex gap-2">
                <span>Sub category:</span>
                <span>{subCategory}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Product Price */}
        <div className="flex flex-col justify-between">
          <div>
            {sizes.map((item) => (
              <div>
                {item.size} X {item.q}
              </div>
            ))}
          </div>
          <div>total: Rs.23,000</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
