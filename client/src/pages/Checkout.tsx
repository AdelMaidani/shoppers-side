import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutItem from "../components/CheckoutItem";
import { useCart } from "../contexts/CartContext";
import { iProducts } from "../interfaces/ProductInterface";

function Checkout() {
  const { cart } = useCart();
  const [cartItems, setCartItems] = useState<iProducts["products"]>([]);

  useEffect(() => {
    if (cart.length > 0) {
      const Ids = [] as any;
      var one = new Promise<void>((resolve, reject) => {
        cart.forEach((value, index, array) => {
          Ids.push(value.id);
          if (index === array.length - 1) {
            resolve();
          }
        });
      });
      one.then(() => {
        console.log("send");
        axios({
          method: "Post",
          headers: { "Content-Type": "application/json" },
          url: "http://localhost:5000/api/vendor/getProductByIds",
          data: { Ids },
        })
          .then((res) => {
            setCartItems(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, []);
  return (
    <div className="bg-black h-screen flex gap-10 text-white p-10">
      <div className="w-3/5">
        <span className="text-xl">Cart</span>
        {cartItems.map((item) => (
          <div className="flex justify-between gap-5">
            <CheckoutItem
              coverPhoto={item.coverPhoto}
              productName={item.productName}
              category={item.category}
              subCategory={item.subCategory}
              _id={item._id}
            />
          </div>
        ))}
      </div>
      <div className=""></div>
    </div>
  );
}

export default Checkout;
