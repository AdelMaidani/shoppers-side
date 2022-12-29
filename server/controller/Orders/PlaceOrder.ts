import { Request, Response } from "express";
import Order from "../../models/Orders";

const PlaceOrder = async (req: Request, res: Response) => {
  const { product, userId, address, totalValue, status } = req.body;
  const order = new Order({
    product,
    userId,
    address,
    totalValue,
    status,
  });

  const place = await order.save();
  res.send(place);
};

export default PlaceOrder;
