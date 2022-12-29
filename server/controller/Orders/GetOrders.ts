import { Request, Response } from "express";
import Order from "../../models/Orders";

const GetOrders = async (req: Request, res: Response) => {
  Order.find({})
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

export default GetOrders;
