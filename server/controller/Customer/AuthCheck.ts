import { Request, Response } from "express";
import Customer from "../../models/Customer";
import Vendor from "../../models/Vendor";

const AuthCheck = (req: Request, res: Response) => {
  const Authorization = res.locals.Authorization;
  const UserId = res.locals.UserId;
  const UserType = res.locals.UserType;

  if (UserType === "Customer") {
    Customer.find({
      _id: { $in: UserId },
    })
      .then((resp) => {
        res.send({ UserData: resp, Authorization, UserType });
      })
      .catch((err) => res.send(err));
  } else {
    Vendor.find({
      _id: { $in: UserId },
    })
      .then((resp) => {
        res.send({ UserData: resp, Authorization, UserType });
      })
      .catch((err) => res.send(err));
  }
};

export default AuthCheck;
