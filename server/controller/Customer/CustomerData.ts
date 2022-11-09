import { Request, Response } from "express";
import Customer from "../../models/Customer";

const CustomerData = (req: Request, res: Response) => {
  const id = req.body.customerId;
  Customer.find({
    _id: { $in: id },
  })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

export default CustomerData;
