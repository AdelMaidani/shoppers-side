import { Request, Response } from "express";
import Product from "../../models/Product";

const getProduct = (req: Request, res: Response) => {
  Product.find({})
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

const getProductById = (req: Request, res: Response) => {
  Product.find({
    _id: { $in: req.body.id },
  })
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

const getProductByIds = (req: Request, res: Response) => {
  const Ids = req.body.Ids;

  Product.find({
    _id: { $in: Ids },
  })
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

export { getProduct, getProductById, getProductByIds };
