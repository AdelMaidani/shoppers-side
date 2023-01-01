import { Request, Response } from "express";
import Order from "../../models/Orders";
import Product from "../../models/Product";

const PlaceOrder = async (req: Request, res: Response) => {
  const {
    product,
    userId,
    totalValue,
    status,
    country,
    city,
    street1,
    street2,
    pincode,
    shippingMethod,
    cardNumber,
    nameOnCard,
    countryOnCard,
  } = req.body;

  const order = new Order({
    product,
    userId,
    totalValue,
    status,
    country,
    city,
    street1,
    street2,
    pincode,
    shippingMethod,
    cardNumber,
    nameOnCard,
    countryOnCard,
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
