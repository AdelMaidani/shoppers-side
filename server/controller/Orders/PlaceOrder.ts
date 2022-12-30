import { Request, Response } from "express";
import Order from "../../models/Orders";
import Product from "../../models/Product";

const PlaceOrder = async (req: Request, res: Response) => {
  const { product, userId, address, totalValue, status } = req.body;
  const order = new Order({
    product,
    userId,
    address,
    totalValue,
    status,
  });

  await order.save();

  product.map((item: any) => {
    item.sizes.map((size: any) => {
      Product.updateMany(
        { _id: item.id, "size.size": size.size },
        { $inc: { "size.$.q": -1, "size.$.sold": +1 } }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
  });
};

export default PlaceOrder;
