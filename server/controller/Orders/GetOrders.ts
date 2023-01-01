import { Request, Response } from "express";
import Order from "../../models/Orders";
import Product from "../../models/Product";

const GetOrders = async (req: Request, res: Response) => {
  Order.find({})
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const GetCustomOrder = (req: Request, res: Response) => {
  Order.find({
    _id: { $in: req.body.id },
  })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const GetMuiltipleOrder = (req: Request, res: Response) => {
  Product.find({
    _id: { $in: req.body },
  })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

export { GetOrders, GetCustomOrder, GetMuiltipleOrder };
