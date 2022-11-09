import { Request, Response } from "express";
import Product from "../../models/Product";

const CreateProduct = async (req: Request, res: Response) => {
  const {
    productName,
    price,
    category,
    subCategory,
    description,
    images,
    coverPhoto,
    size,
  } = req.body;
  const date = new Date();
  const product = new Product({
    productName,
    price,
    category,
    subCategory,
    description,
    images,
    coverPhoto,
    size,
    date,
  });
  const save = await product.save();
  res.send(save);
};

export default CreateProduct;
